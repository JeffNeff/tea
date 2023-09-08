import {useState} from 'react'
import { NumberInput, Grid, Select, createStyles, TextInput } from "@mantine/core";
import sellCurrencyState from '../../stateStores/trade/sellCurrencyState';
import sellAmountState from '../../stateStores/trade/sellAmountState';
import { useRecoilState } from 'recoil';
import currencyList from '../../resources/currencyList';





export default function SellInput() {



  const [sellCurrency, setSellCurrency] = useRecoilState(sellCurrencyState)
  const [sellAmount, setSellAmount] = useRecoilState(sellAmountState)
  const [sellFocus, setSellFocus] = useState(false)

  const textContainer = {
    border: sellFocus ? "1px solid #7DC4A6" : "1px solid #D0D0D0",
    borderRadius: "100px",
    boxShadow: "inset 1px 1px 3px #00000029",
    backgroundColor: sellFocus ? "#ECF7F2" : "white"
  };

  const useStyles = createStyles((theme)  => ({
    input: {
      boxShadow: "1px 1px 1px #00000029;",
    }
  }))

  const { classes } = useStyles()

  const onAmountChange = (event) => {
    const amount = event.target.value
    if (!amount || amount.match(/^\d{1,}(\.\d{0,})?$/)) {
      setSellAmount(amount);
    }

  }



  return (
    <Grid style={textContainer}>
      <Grid.Col span={6}>
        <Select classNames={{input: classes.input}} className="sell-currency-select" onFocus={() => setSellFocus(true)} onBlur={() => setSellFocus(false)} radius="xl" value={sellCurrency} onChange={setSellCurrency}  data={currencyList} dropdownPosition="down" placeholder="Choose Currency" />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput placeholder="0000" value={sellAmount} onFocus={() => setSellFocus(true)} onBlur={() => setSellFocus(false)}  onChange={onAmountChange} variant="unstyled" />
      </Grid.Col>
    </Grid>
  );
}
