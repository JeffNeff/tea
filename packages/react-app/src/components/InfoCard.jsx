import { Paper, Flex, Text } from "@mantine/core";

/**
 * An flexible card for sharing stats with short descriptions and space for an icon.
 */

function InfoCard({valueNum, description, icon}){


    return (
        <Paper p={24}  radius="xl" style={{boxShadow: "inset 1px 1px 3px #00000029"}}>
            <Flex justify="center" align="center">
                <Flex pr={10} style={{fontSize: "2rem", color: "#345959"}} direction="column" align="center" justify="center">
                    {/* The above style will apply to the below, allowing us to dynamically swap icons out. */}
                    {icon}
                </Flex>
                <div>
                    <Text style={{color: "#C7C58A", fontWeight: "bold", fontSize: "22px"}}>{valueNum}</Text>
                    <Text style={{color: "#265A5A", fontWeight: "bold", fontSize: "12px"}}>{description}</Text>
                </div>
            </Flex>
        </Paper>
    )

}

export default InfoCard