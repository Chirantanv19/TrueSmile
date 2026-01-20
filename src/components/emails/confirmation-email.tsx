import * as React from "react";
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Preview,
  Section,
  Heading,
  Hr,
} from "@react-email/components";

interface EmailProps {
  patientName: string;
  date: string;
  time: string;
}

export default function ConfirmationEmail({
  patientName,
  date,
  time,
}: EmailProps) {
  return (
    <Html>
      <Preview>Appointment Confirmed: {date} at {time}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Appointment Confirmed</Heading>
          <Text style={text}>Hi {patientName},</Text>
          <Text style={text}>
            Good news! Your appointment has been successfully booked.
          </Text>
          
          <Section style={box}>
            <Text style={paragraph}>
              <strong>Date:</strong> {date}
            </Text>
            <Text style={paragraph}>
              <strong>Time:</strong> {time}
            </Text>
            <Text style={paragraph}>
              <strong>Location:</strong> TrueSmile Clinic, Dubai
            </Text>
          </Section>

          <Text style={text}>
            Please arrive 10 minutes early. If you need to reschedule, reply to this email.
          </Text>
          
          <Hr style={hr} />
          
          <Text style={footer}>TrueSmile Clinic Automated System</Text>
        </Container>
      </Body>
    </Html>
  );
}

// Simple Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  padding: "17px 0 0",
  textAlign: "center" as const,
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  textAlign: "left" as const,
  padding: "0 40px",
};

const box = {
  padding: "24px",
  backgroundColor: "#f2f3f3",
  borderRadius: "4px",
  margin: "24px 40px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  textAlign: "center" as const,
};