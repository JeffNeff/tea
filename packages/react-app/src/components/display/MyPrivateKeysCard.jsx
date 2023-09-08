import { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  Card,
  Button,
  Box,
  Grid,
  Text,
  Badge,
  Stack,
  Flex,
  Title,
  createStyles
} from "@mantine/core";
import CryptoIcon from "../utility/CryptoIcon";
import { BsCheckCircle } from "react-icons/bs";
import { AiOutlineKey } from "react-icons/ai";
import userPrivateKeysState from "../../stateStores/trade/userPrivateKeysState";
import axios from "axios";

function PrivateKeyList() {
  const [userPrivateKeys, setUserPrivateKeys] =
    useRecoilState(userPrivateKeysState);


    const useStyles = createStyles((theme) => ({
      copyBtnRoot: {
        backgroundColor: "#265A5A",
        color: "#FFFFFF",
        "&:hover": {
          backgroundColor: "#163636"
        }
      },
    }))

    const {classes} = useStyles()

  // deletePK is called to delete a private key from the local environment
  const deletePK = async (address) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/deletePK`, {
        address: address,
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          //alert("Private Key Deleted");
          getPKs();
          return;
        }
      })
      .catch((error) => {
        console.log(error);
        //alert("Error Deleting Private Key: " + error);
      });
  };

  // on load fetch the private keys
  useEffect(() => {
    getPKs();
  }, []);

  // getPKs is called to fetch the locally stored private keys from the local environment
  const getPKs = async () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/getPrivateKeys`)
      .then((response) => {
        console.log(response.data);
        setUserPrivateKeys(response.data);
        return response.data;
      })
      .catch((error) => {
        //alert("Error Fetching Private Keys: " + error);
        console.log(error);
      });
  };

  const returnLogo = (chain) => {
    // your returnLogo function here
    // return a default logo
    return "https://avatars.githubusercontent.com/u/42378687?s=200&v=4";
  };

  const testKeys = [
    {
      address: "98749032n1984u1209n812n0",
      chain: "grams",
      privateKey: "privateprivateprivateprivateprivateprivate",
    },
    {
      address: "klasdfjklasdhfkdhsyfdfhs",
      chain: "BTC",
      privateKey: "privateprivateprivateprivateprivateprivate",
    },
    {
      address: "999999089809709709790",
      chain: "grams",
      privateKey: "privateprivateprivateprivateprivateprivate",
    },
  ];

  if (userPrivateKeys) {
    return (
      <Stack>
        {userPrivateKeys.length ? (
          userPrivateKeys.map((account) => (
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              key={account.address}
            >
              <Stack>
                <Stack spacing="xs" >
                  <Text fz="xl" style={{ color: "#265A5A" }} fw={700}>
                    Chain
                  </Text>
                  <Text>{account.chain}</Text>
                </Stack>
                <Stack spacing="xs">
                  <Text style={{ color: "#265A5A" }} fz="xl" fw={700}>
                    Address
                  </Text>
                  <Text>{account.address}</Text>
                </Stack>
                <Stack spacing="md">
                  <Text style={{ color: "#265A5A" }} fz="xl" fw={700}>
                    Private Key
                  </Text>
                  <Text sx={{color: "#265A5A", backgroundColor: "#265A5A", borderRadius: "100px", padding: "4px"}}>{account.privateKey}</Text>
                  <Flex gap="md">
                    <Button onClick={() => {
                       navigator.clipboard.writeText(account.privateKey);
                     }} classNames={{root: classes.copyBtnRoot}} size="xs" radius="xl">
                      Copy
                    </Button>
                    <Button onClick={() => {
                         deletePK(account.address);}} size="xs" color="red.9" radius="xl">
                      Delete
                    </Button>
                  </Flex>
                </Stack>
              </Stack>
            </Card>
          ))
        ) : (
          <Text>No Private Keys</Text>
        )}
      </Stack>
    );
  } else {
    return null;
  }

  // if (userPrivateKeys) {
  //   return (
  //     <Card shadow="sm" style={{ marginTop: '1rem', backgroundColor: '#282c34' }}>
  //       <Card.Section>
  //         <Box p="xl">
  //           <Text
  //             size="xl"
  //             weight={700}
  //             style={{ color: '#3EB489', marginBottom: '1rem' }}
  //           >
  //             Private Keys:
  //           </Text>
  //           {userPrivateKeys.length ? (
  //             userPrivateKeys.map((account) => (
  //               <Card
  //                 key={account.address}
  //                 shadow="sm"
  //                 style={{
  //                   marginBottom: '1rem',
  //                   backgroundColor: '#282c34',
  //                   borderColor: '#3EB489',
  //                 }}
  //               >
  //                 <Box p="xl">
  //                   <Text
  //                     size="lg"
  //                     weight={700}
  //                     style={{ color: '#3EB489', marginBottom: '0.5rem' }}
  //                   >
  //                     Chain:
  //                   </Text>
  //                   <Stack direction="horizontal" align="center">
  //                     <img
  //                       src={returnLogo(account.chain)}
  //                       alt="Tea Party Logo"
  //                       width="25"
  //                       height="25"
  //                       style={{ marginRight: '0.5rem' }}
  //                     />
  //                     <Text style={{ color: '#3EB489', fontWeight: 'bold' }}>
  //                       {account.chain}
  //                     </Text>
  //                   </Stack>
  //                 </Box>
  //                 <Box p="xl">
  //                   <Text
  //                     size="lg"
  //                     weight={700}
  //                     style={{ color: '#3EB489', marginBottom: '0.5rem' }}
  //                   >
  //                     Address:
  //                   </Text>
  //                   <Text style={{ color: '#3EB489', fontWeight: 'bold' }}>
  //                     {account.address}
  //                   </Text>
  //                 </Box>
  //                 <Box p="xl">
  //                   <Text
  //                     size="lg"
  //                     weight={700}
  //                     style={{ color: '#3EB489', marginBottom: '0.5rem' }}
  //                   >
  //                     Private Key:
  //                   </Text>
  //                   <Text style={{ color: '#282c34', fontWeight: 'bold' }}>
  //                     {account.privateKey}
  //                   </Text>
  //                   <Button
  //                     style={{
  //                       backgroundColor: '#023020',
  //                       color: '#3EB489',
  //                       fontWeight: 'bold',
  //                       marginLeft: '1rem',
  //                     }}
  //                     onClick={() => {
  //                       navigator.clipboard.writeText(account.privateKey);
  //                     }}
  //                   >
  //                     Copy
  //                   </Button>
  //                   <Button
  //                     style={{
  //                       backgroundColor: '#023020',
  //                       color: '#3EB489',
  //                       fontWeight: 'bold',
  //                       marginLeft: '1rem',
  //                     }}
  //                     onClick={() => {
  //                       deletePK(account.address);
  //                     }}
  //                   >
  //                     Delete
  //                   </Button>
  //                 </Box>
  //               </Card>
  //             ))
  //           ) : (
  //             <Text>No Private Keys</Text>
  //           )}
  //         </Box>
  //       </Card.Section>
  //     </Card>
  //   );
  // } else {
  //   return null;
  // }
}

export default PrivateKeyList;
