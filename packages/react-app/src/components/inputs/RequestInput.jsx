import {useState} from 'react'
import { NumberInput, Grid, Select, createStyles, TextInput } from "@mantine/core";
import requestAmountState from '../../stateStores/trade/requestAmountState';
import requestCurrencyState from '../../stateStores/trade/requestCurrencyState';
import { useRecoilState } from 'recoil';
import currencyList from '../../resources/currencyList';








export default function SellInput() {



  const [requestCurrency, setRequestCurrency] = useRecoilState(requestCurrencyState)
  const [requestAmount, setRequestAmount] = useRecoilState(requestAmountState)
  const [requestFocus, setRequestFocus] = useState(false)

  const textContainer = {
    border: requestFocus ? "1px solid #7DC4A6" : "1px solid #D0D0D0",
    borderRadius: "100px",
    boxShadow: "inset 1px 1px 3px #00000029",
    backgroundColor: requestFocus ? "#ECF7F2" : "white"
  };

  const useStyles = createStyles((theme)  => ({
    input: {
      boxShadow: "1px 1px 1px #00000029;",
    }
  }))

  const { classes } = useStyles()

  const onAmountChange = (event) => {
    const amount = event.target.value
    if (!amount || amount.match(/^\d{0,}(\.\d{0,})?$/)) {
      setRequestAmount(amount);
    }

  }



  return (
    <Grid style={textContainer}>
      <Grid.Col span={6}>
        <Select classNames={{input: classes.input}} className="sell-currency-select" onFocus={() => setRequestFocus(true)} onBlur={() => setRequestFocus(false)} radius="xl" value={requestCurrency} onChange={setRequestCurrency}  data={currencyList} dropdownPosition="down" placeholder="Choose Currency" />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput placeholder="0000" value={requestAmount} onFocus={() => setRequestFocus(true)} onBlur={() => setRequestFocus(false)}  onChange={onAmountChange} variant="unstyled" />
      </Grid.Col>
    </Grid>
  );
}
