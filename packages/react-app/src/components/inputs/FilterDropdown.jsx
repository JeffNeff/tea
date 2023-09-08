import { forwardRef } from "react";
import {
  Divider,
  MultiSelect,
  Group,
  Box,
  Flex,
  Text,
  CloseButton,
} from "@mantine/core";
import CryptoIcon from "../utility/CryptoIcon";
import currencyList from "./../../resources/currencyList";
import { rem, createStyles } from "@mantine/core";

const SelectItem = forwardRef(({ value, label, ...others }, ref) => {
  return (
    <div ref={ref} {...others}>
      <Flex align="center" >
        <Box mr={10}>
          <CryptoIcon currency={value} />
        </Box>
        <Text>{label}</Text>
      </Flex>
    </div>
  );
});

function ValueItem ({value, label, onRemove, classNames, ...others}) {


    return (
        <div {...others}>
        <Box
          sx={(theme) => ({
            display: 'flex',
            cursor: 'default',
            alignItems: 'center',
            justifyContent: "center",
            backgroundColor: "#a2d7bf",
            paddingLeft: theme.spacing.xs,
            borderRadius: theme.radius.xl,
          })}
        >
          <Flex align="center" justify="center" mr={10}>
            <CryptoIcon avaterSize={"sm"} currency={value} height="16px" width="16px" />
          </Flex>
          <Flex sx={{ lineHeight: 1, fontSize: rem(12) }}>{label}</Flex>
          <CloseButton
            onMouseDown={onRemove}
            variant="transparent"
            size={22}
            iconSize={14}
            tabIndex={-1}
          />
        </Box>
      </div>
    )

}

export default function FilterDropDown({onChange, inputLabel}) {

    const useStyles = createStyles((theme) => ({
        input: {
            boxShadow: "inset 1px 1px 3px #00000029",


        },


    }))

    const {classes} = useStyles()

    // function changeHandler(event){
    //     console.log("CHANGE EVENT")
    //     console.log(event)
    // }
  return (
    <MultiSelect
    radius="xl"
    classNames={{input: classes.input }}
      onChange={onChange}
      data={currencyList}
      itemComponent={SelectItem}
      valueComponent={ValueItem}
      label={inputLabel}
    />
  );
}
