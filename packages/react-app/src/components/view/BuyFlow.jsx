import { Container, Grid, Stepper, rem, createStyles, Text } from "@mantine/core";
import { useState } from "react";
import InProgressTradeCard from "../display/InProgressCard";

function BuyFlow() {
  const [step, setStep] = useState(0);

  let descriptionArr = [
    "Enter shipping info and submit to accept offer and transaction fee.",
    "Use your digital wallet to send payment to the address provided.",
    "Retrieve your private key once seller has completed trade.",
  ];

  const stepIconColor = "#44AF7F";

  const useStyles = createStyles((theme) => ({
    stepBody: {
      display: "block",
    },
    stepWrapper: {
      height: "10rem",
    },
    stepIcon: {
      backgroundColor: "#CDCDCD",
      border: "none",
      color: "white",
      "&[data-completed]": {
        backgroundColor: stepIconColor,
        borderRadius: "100px",
        border: "none",
        color: "white",
      },
    },
    stepLabel: {
      color: stepIconColor,
      fontWeight: 700,
    },
    stepDescription: {
      color: "#3D3D3D",
      letterSpacing: ".5px",
    },
  }));

  const { classes } = useStyles();

  // const stepStyles = {
  //   stepBody: {
  //     display: 'block',
  //   },
  //   stepWrapper: {
  //       height: "15rem"
  //   },
  //   stepIcon: {
  //     backgroundColor: "#CDCDCD",
  //     border: "none",
  //     color: "white"
  //   },
  //   stepCompletedIcon: {
  //     backgroundColor: stepIconColor,
  //     borderRadius: "100px",
  //     border: "none",
  //     color: "white"
  //   },
  //   verticalSeperator: {
  //     border: "0.125rem solid #44AF7F"
  //   },
  //   verticalSeperatorActive: {
  //     border: "0.125rem solid #44AF7F",
  //   }
  // }

  return (
      <Grid.Col span={12}>
        <Container size="1400px">
          <Grid columns={24}>
            <Grid.Col span={4}>
              <Stepper
                active={step}
                classNames={classes}
                onStepClick={setStep}
                orientation="vertical"
              >
                <Stepper.Step
                  label="Enter shipping info"
                  description={descriptionArr[0]}
                />
                <Stepper.Step
                  label="Pay seller"
                  description={descriptionArr[1]}
                />
                <Stepper.Step
                  label="Retrieve Key"
                  description={descriptionArr[2]}
                />
              </Stepper>
            </Grid.Col>
            <Grid.Col span={7} offset={4}>
              <InProgressTradeCard />
            </Grid.Col>
          </Grid>
        </Container>
      </Grid.Col>
  );
}

export default BuyFlow;
