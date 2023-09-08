import {
  Table,
  Card,
  Grid,
  Flex,
  Button,
  createStyles,
  MultiSelect,
  TextInput,
  Text,
} from "@mantine/core";
import { MdIosShare } from "react-icons/md";
import { useRecoilState } from "recoil";
import { BiSearch } from 'react-icons/bi'
import { useEffect, useState, useRef } from "react";
import axios from "axios";


import testSells from "../../resources/testSells";
import CryptoIcon from "../utility/CryptoIcon";
import searchState from '../../stateStores/searchState';
import currencyList from "../../resources/currencyList";
import FilterDropDown from "../inputs/FilterDropdown";

import sellFilterState from "../../stateStores/trade/sellFilterState";
import buyFilterState from "../../stateStores/trade/buyFilterState";
import tradeInProgressState from "../../stateStores/trade/tradeInProgressState";
import myNKNAddressState from "../../stateStores/trade/myNKNAddressState.js";
import userCurrentPendingPayOrdersState from "../../stateStores/trade/userCurrentPendingPayOrdersState";
import userPrivateKeysState from "../../stateStores/trade/userPrivateKeysState";
import eventsState from "../../stateStores/trade/eventsState";
import currentOpenOrdersState from "../../stateStores/trade/currentOpenOrdersState";
import tradeInProgressCurrentOrderState from "../../stateStores/trade/tradeInProgressCurrentOrderState";

/**
 * This component is designed to display open Tea trades
 */

function MarketTable() {
  const useStyles = createStyles({
    btnRoot: {
      paddingLeft: "2rem",
      paddingRight: "2rem",
      boxShadow: "1px 1px 1px #00000029",
      backgroundColor: "#44AF7F",
      "&:hover": {
        backgroundColor: "white",
        color: "#44AF7F",
        border: "1px solid #44AF7F",
      },
    },
  });

  const rowTextClass = {
    color: "#3D3D3D",
    fontWeight: "600",
    letterSpacing: ".50px",
  };

  const { classes } = useStyles();

  const [sellFilter, setSellFilter] = useRecoilState(sellFilterState)
  const [buyFilter, setBuyFilter] = useRecoilState(buyFilterState)
  const [searchValue, setSearchValue] = useRecoilState(searchState)
  const [inBuyFlow, setInBuyFlow] = useRecoilState(tradeInProgressState)


  const [myNKNAddress, setMyNKNAddress] = useRecoilState(myNKNAddressState);
  const [userCurrentPendingPayOrders, setUserCurrentPendingPayOrders] = useRecoilState(userCurrentPendingPayOrdersState);
  const [userPrivateKeys, setUserPrivateKeys] = useRecoilState(userPrivateKeysState);
  const [events, setEvents] = useRecoilState(eventsState);
  const [currentOpenOrders, setCurrentOpenOrders] = useRecoilState(currentOpenOrdersState);
  const [tradeInProgressCurrentOrder, setTradeInProgressCurrentOrderState] = useRecoilState(tradeInProgressCurrentOrderState)


  const [isOpen, setIsOpen] = useState(false);
  const [waitingToReconnect, setWaitingToReconnect] = useState(null);
  const clientRef = useRef(null);

  function handleSellChange(event) {
    console.log("Sell Hook")
    setSellFilter(event)
  }

  function handleBuyChange(event) {
    console.log("Buy Hook")
    setBuyFilter(event)
  }

  function handleBuyButton(item) {
    // set the tradeInProgressCurrentOrderState to the order that was clicked
    setTradeInProgressCurrentOrderState(item)
    setInBuyFlow(true)
  }


  var marketItems = <tr><td>No Open Orders</td></tr>
  // we are going to re-map marketItems to use the information stored in currentOpenOrders
  // here is an example of the data
  // [{"currency":"polygon","amount":1000000000000000000,"tradeAsset":"radiant","price":2000000000000000000,"txid":"ed745ec3-64bb-451e-8897-78477048f537","locked":false,"sellerShippingAddress":"x","sellerNKNAddress":"a93541e73808213c48dd624a10cf5d0f2cc5d51033acc4b1f9b5426c295c97eb","paymentTransactionID":"0x5dd4039c32F6EEF427D6F67600D8920c9631D59D","refundAddress":"a","private":false,"onChain":false,"assisted":false,"assistedTradeOrderInformation":{"sellersEscrowWallet":{"publicAddress":"","privateKey":"","chain":""},"sellerRefundAddress":"","sellerShippingAddress":"","tradeAsset":"","price":null,"currency":"","amount":null,"bridgeTo":""},"nftID":0}]
  if (currentOpenOrders.length > 0) {
    marketItems = currentOpenOrders.map((item) => (
      <tr key={item.id}>
        <td>
          <Flex>
            <Flex justify="center" align="center" pr={10}>
              <CryptoIcon currency={item.tradeAsset} />
            </Flex>
            <div>
              <Text style={rowTextClass}>{item.currency}</Text>
              <Text style={rowTextClass}>{item.amount  / 1000000000000000000}</Text>
            </div>
          </Flex>
        </td>
        <td>
          <Flex>
            <Flex justify="center" align="center" pr={10}>
              <CryptoIcon currency={item.tradeAsset} />
            </Flex>
            <div>
              <Text style={rowTextClass}>{item.tradeAsset}</Text>
              <Text style={rowTextClass}>{item.price / 1000000000000000000}</Text>
            </div>
          </Flex>
        </td>
        <td>
          <span>Added sometime</span>
        </td>
        <td>
          <Flex align="center">
            <MdIosShare />
          </Flex>
        </td>
        <td>
          <Button
            classNames={{ root: classes.btnRoot }}
            color="green"
            radius="xl"
            onClick={e => handleBuyButton(item)}
          >
            Buy
          </Button>
        </td>
      </tr>
    ));
  }


  return (
    <Grid>
      <Grid.Col span={6}>
        <TextInput value={searchValue} icon={<BiSearch style={{ color: "#21504F", fontSize: "1.25rem" }} />} onChange={(event) => { if (event != undefined) {setSearchValue(event.target.value)}}} radius="xl" placeholder="Search Here..." />
      </Grid.Col>
      <Grid.Col span={12}>
        <FilterDropDown onChange={(value) => setSellFilter(value)} inputLabel={"Selling"} />

      </Grid.Col>
      <Grid.Col span={12}>
        <FilterDropDown onChange={(value) => setBuyFilter(value)} inputLabel={"Requesting"} />

      </Grid.Col>

      {/* <Grid.Col span={2}>

        </Grid.Col>
        <Grid.Col span={2}>

        </Grid.Col>
        <Grid.Col span={2}>
          
        </Grid.Col> */}
      <Grid.Col span={12}>
        <Card
          sx={{ height: "30rem", boxShadow: "inset 1px 1px 3px #00000029" }}
          radius="lg">
          <Grid>
            <Grid.Col span={12}>
              <Table>
                <thead>
                  <tr>
                    <th>Selling</th>
                    <th>Requesting</th>
                    <th>Added</th>
                    <th>Share</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{marketItems}</tbody>
              </Table>
            </Grid.Col>
          </Grid>
        </Card>
      </Grid.Col>
    </Grid>
  );
}

export default MarketTable;
