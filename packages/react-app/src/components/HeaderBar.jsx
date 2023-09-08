import {Flex, Text, Button, Grid, createStyles} from '@mantine/core'
import { useRecoilState } from 'recoil';
import tradeInProgressState from '../stateStores/trade/tradeInProgressState';
import teaIcon from '../assets/TeaPartyLogo.svg'
import {HiArrowLeft} from 'react-icons/hi2'

export default function HeaderBar() {

    const useStyles = createStyles((theme) => ({
      btnLabel: {
        color: "#265A5A"
      },
      btnRoot: {
        '&:hover': {
          backgroundColor: "#ECF7F2"
        }
      }
    }))

    const {classes} = useStyles()

    const [buyFlow, setBuyFlow] = useRecoilState(tradeInProgressState)

    const headerContent = () => {
        if (!buyFlow){
            return (
              <Flex ml={80} align="baseline">
                <Text fw={700} style={{color: "#265A5A"}} size={41}>Marketplace</Text>
                {/* <Text fs="italic" style={{color: "#265A5A", display: "flex"}} ml="md">powered by </Text><Text style={{color: "#265A5A"}} fs="italic" fw={700}>Tea</Text> */}
                <p style={{color: "#265A5A", fontStyle: "italic", marginLeft: "1rem"}}>Powered by <strong>Tea</strong>  </p>
              </Flex>
            )} else {
              return (
                <Flex ml={80} align="baseline">
                  <Button styles={{
                    label: classes.btnLabel,
                    root: classes.btnRoot
                  }} variant="subtle" leftIcon={<HiArrowLeft style={{color: "#265A5A"}} />} onClick={() => setBuyFlow(false)}>Back to MarketPlace</Button>
                </Flex>
              )
            }
    }


    return (
        <Grid.Col span={12}>
            <Flex ml={100} align="center">
                {/*<BsCupHotFill style={{fontSize: "4rem"}} />*/}
                <div>
                    <img src={teaIcon} alt="Tea Icon" />
                </div>
                {headerContent()}
            </Flex>
        </Grid.Col>
    )





  }