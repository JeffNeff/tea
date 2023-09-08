import {Flex, Popover, Text} from '@mantine/core'
import { AiFillQuestionCircle } from "react-icons/ai";

export default function ShippingLabel(label, popText) {
    return (
      <Flex align="center">
        <Popover width={280} shadow="md">
          <Popover.Target>
            <Flex align="center">
              <Text size="xs">{label}</Text>
              <AiFillQuestionCircle style={{paddingLeft: ".25rem"}} className="shipping-popover" />
            </Flex>
          </Popover.Target>
          <Popover.Dropdown>
            <Text size="sm">
              {popText}
            </Text>
          </Popover.Dropdown>
        </Popover>

      </Flex>
    );
  }