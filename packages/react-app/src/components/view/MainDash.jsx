import {
  Grid,
  Container,
  Tabs,
  Stack,
  Paper,
  Text,
  Box,
  Flex,
} from "@mantine/core";
import InfoCard from "../InfoCard";
import MarketTable from "../table/MarketTable";
import TradeCard from "../TradeCard";
import MyTradePanel from "../display/MyTradePanel";
import MyPrivateKeysCard from "../display/MyPrivateKeysCard";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import cardBackground from "../../assets/Welcome_Graphic.png";

import { CgCoffee } from "react-icons/cg";
import { VscRemote } from "react-icons/vsc";
import { BsPeople } from "react-icons/bs";
// import { GiDiabloSkull } from "react-icons/gi";
import { HiArrowLongRight } from "react-icons/hi2";

export default function MainDash() {
  const [metrics, setMetricInfo] = useState([]);

  useEffect(() => {
    const promURl = 'http://173.239.91.133:212';
    const list = [
      'trades_in_progress',
      'completed_trades_total',
      'failed_buy_request_total',
      'failed_sell_request_total',
      'buy_request_total',
      'sell_request_total',
    ];

    const getMetrics = async () => {
      const requests = list.map((item) => {
        return axios.get(`${promURl}/api/v1/query?query=${item}`)
          .then((response) => {
            // assuming response.data.data.result is an array
            const metricData = response.data.data.result[0];
            // check if metricData exists before trying to access its properties
            if (metricData) {
              // return an object where the key is the metric name (without the '__name__' prefix) and the value is the metric value
              return { [metricData.metric.__name__]: metricData.value[1] };
            } else {
              // if metricData does not exist, return an empty object
              return {};
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    
      Promise.all(requests)
        .then((responses) => {
          // combine all the metric objects into a single object
          const combinedMetrics = Object.assign({}, ...responses);
          setMetricInfo(combinedMetrics);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    
    
    
    getMetrics();
  }, [   ]);


  return (
    <Grid.Col span={12}>
      <Container size="1400px">
        <Grid>
          <Grid.Col span={8}>
            <Stack>
              <Grid>
              {/* <Grid.Col span={3}>
                  <InfoCard
                    valueNum={metrics['trades_in_progress']}
                    description={"Pending Trades"}
                    icon={<CgCoffee />}
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <InfoCard
                    valueNum={metrics['completed_trades_total']}
                    description={"Total Successful Trades"}
                    icon={<VscRemote />}
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <InfoCard
                    valueNum={metrics['failed_buy_request_total']|| 0}
                    description={"Failed Buy Requests"}
                    icon={<BsPeople />}
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <InfoCard
                    valueNum={metrics['failed_sell_request_total'] || 0}
                    description={"Failed Sell Requests"}
                    icon={<BsPeople />}
                  />
                </Grid.Col> */}
                {/* <Grid.Col span={3}>
                  <InfoCard
                    valueNum={metrics['buy_request_total']}
                    description={"Total Buy Requests"}
                    icon={<BsPeople />}
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <InfoCard
                    valueNum={metrics['sell_request_total']}
                    description={"Total Sell Requests"}
                    icon={<BsPeople />}
                  />
                </Grid.Col> */}

                {/* <Grid.Col span={3}>
                  <InfoCard
                    valueNum="400"
                    description={"Hellspawn defeated"}
                    icon={<GiDiabloSkull />}
                  />
                </Grid.Col> */}
              </Grid>

              <Tabs defaultValue="market">
                <Tabs.List>
                  <Tabs.Tab value="market">Buy/Sell</Tabs.Tab>
                  <Tabs.Tab value="my-trades">My Trades</Tabs.Tab>
                  <Tabs.Tab value="my-keys">My Keys</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="market" pt="xs">
                  <MarketTable />
                </Tabs.Panel>

                <Tabs.Panel value="my-trades" pt="xs">
                  <MyTradePanel />
                </Tabs.Panel>

                <Tabs.Panel value="my-keys" pt="xs">
                  <MyPrivateKeysCard />
                </Tabs.Panel>
              </Tabs>
            </Stack>
          </Grid.Col>
          <Grid.Col span={4}>
            <Box
              bgp="center"
              p="lg"
              mb={10}
              style={{
                backgroundImage: `url(${cardBackground})`,
                backgroundSize: "cover",
                borderRadius: "25px",
              }}
            >
              <Stack>
                <Text fw={700} fz={32} fs="italic" style={{ color: "white" }}>
                  Welcome to Tea!
                </Text>
                <Text style={{ color: "white" }}>Are you new to TeaParty?</Text>
                <Flex style={{ color: "#EAE2A1" }} align="center">
                  <Text mr="xs">Learn how it works</Text>
                  <HiArrowLongRight
                    style={{ display: "flex", alignItems: "center" }} />
                </Flex>
              </Stack>
            </Box>
            {/* <div>
                  <img src={cardBackground} alt="" />
                </div> */}

            <TradeCard />
          </Grid.Col>
        </Grid>
      </Container>
    </Grid.Col>
  );
}
