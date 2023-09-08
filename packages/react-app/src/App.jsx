import { Grid } from "@mantine/core";
import { useRecoilState } from "recoil";

import HeaderBar from "./components/HeaderBar";
import MainDash from "./components/view/MainDash";
import BuyFlow from "./components/view/BuyFlow";
import axios from "axios";
import tradeInProgressState from "./stateStores/trade/tradeInProgressState";
import { useRecoilValue } from "recoil";

import { useEffect,useRef,useState } from "react";

import "./App.css";
import myNKNAddressState from "./stateStores/trade/myNKNAddressState.js";
import currentOpenOrdersState from "./stateStores/trade/currentOpenOrdersState";
import userPrivateKeysState from "./stateStores/trade/userPrivateKeysState";
import userCurrentPendingPayOrdersState from "./stateStores/trade/userCurrentPendingPayOrdersState";
import eventsState from "./stateStores/trade/eventsState";


function App() {
  const buyFlowState = useRecoilValue(tradeInProgressState);
  const [myNKNAddress, setMyNKNAddress] = useRecoilState(myNKNAddressState);
  const [currentOpenOrders, setCurrentOpenOrders] = useRecoilState(currentOpenOrdersState);
  const [inBuyFlow, setInBuyFlow] = useRecoilState(tradeInProgressState)
  const [userPrivateKeys, setUserPrivateKeys] = useRecoilState(userPrivateKeysState);
  const [userCurrentPendingPayOrders, setUserCurrentPendingPayOrders] = useRecoilState(userCurrentPendingPayOrdersState);
  const [events, setEvents] = useRecoilState(eventsState);
  const [isOpen, setIsOpen] = useState(false);
  const [waitingToReconnect, setWaitingToReconnect] = useState(null);
  const clientRef = useRef(null);

    // getNKNAddress is called to fetch the NKN address from tea's backend
    const getNKNAddress = async () => {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/getNKNAddress`)
        .then(response => {
          console.log(response.data);
          setMyNKNAddress(response.data);
          return response.data;
        })
        .catch(error => {
          console.log(error);
          // //alert("Error Fetching NKN Address: " + error);
        });
    };
    
  
    // /listorders is called to fetch all the open orders from Party
    const listOrders = async () => {
      axios
        // .get("http://localhost:8081/list")
        .get(`${process.env.REACT_APP_BACKEND_URL}/list`)
        .then(response => {
          if (response.data) {
            setCurrentOpenOrders(response.data);
          }
        })
        .catch(error => {
          console.log(error);
          // //alert("Error Fetching Open Orders: " + error);
        });
    };
  
    function handleBuyButton() {
      setInBuyFlow(true)
    }
  
    useEffect(() => {
      getNKNAddress();
      if (waitingToReconnect) {
        return;
      }
  
      listOrders();
  
      // Only set up the websocket once
      if (!clientRef.current) {
        const client = new WebSocket(`${process.env.REACT_APP_BACKEND_WS}/ws`);
        clientRef.current = client;
        window.client = client;
        client.onerror = e => console.error(e);
        client.onopen = () => {
          setIsOpen(true);
          console.log("ws opened");
        };
  
        client.onclose = () => {
          if (clientRef.current) {
            console.log("ws closed by server");
          } else {
            console.log("ws closed by app component unmount");
            return;
          }
  
          if (waitingToReconnect) {
            return;
          }
  
          setIsOpen(false);
          console.log("ws closed");
  
          setWaitingToReconnect(true);
          setTimeout(() => setWaitingToReconnect(null), 5000);
        };
  
        client.onmessage = function (e) {
          console.log("message received: ", e);
          const message = JSON.parse(e.data);
          // check if the message contains a duplicate entry inisde the userCurrentPendingPayOrders
          if (userCurrentPendingPayOrders.some(order => order.address === message.address)) {
            console.log("duplicate entry found in userCurrentPendingPayOrders: ", message);
            return;
          }
          setUserCurrentPendingPayOrders(userCurrentPendingPayOrders => [...userCurrentPendingPayOrders, message]);
          console.log("message: ", message);
          console.log("userCurrentPendingPayOrders: ", userCurrentPendingPayOrders);
          // if the message contains an ammout property then add it to the setuserCurrentPendingPayOrders
          if (message.address) {
            console.log("adding to userCurrentPendingPayOrders: ", message)
            setUserCurrentPendingPayOrders(userCurrentPendingPayOrders => [...userCurrentPendingPayOrders, message]);
            console.log("userCurrentPendingPayOrders: ", userCurrentPendingPayOrders);
            // setPendingPayNumberAmmount(pendingPayNumberAmmount + 1);
          }
  
          // if the message contains a privateKey property then add it to the setUserPrivateKeys
          if (message.privateKey) {
            setUserPrivateKeys(userPrivateKeys => [...userPrivateKeys, message]);
          }
  
          // if the message contains an error property then //alert the user
          if (message.error) {
            // //alert(message.error);
            console.log(message.error);
          }
  
          setEvents(messages => [...messages, e.data]);
        };
  
        return () => {
          console.log("Cleanup");
          clientRef.current = null;
          client.close();
        };
      }
    }, [waitingToReconnect]);

  // This is the main entrypoint for the app as of right now

  const renderPage = () => {
    if (buyFlowState) {
      return <BuyFlow />;
    } else {
      return <MainDash  />;
    }
  };
  

  return (
    <Grid>
      <HeaderBar />
      {renderPage()}
    </Grid>
  );
}

export default App;
