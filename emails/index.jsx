import React from "react";
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Link,
  Section,
  Text,
} from "@react-email/components";

const baseUrl = "";

export const Email = ({
  userFirstName,
  duration,
  meetingTime,
  date,
  meetingUrl,
  businessName,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Yelp recent login</Preview>
      <Body style={main}>
        <Container>
          <Section style={logo}>
            <Img src="https://img.logoipsum.com/297.svg" />
          </Section>

          <Section style={content}>
            <Row>
              <Img
                style={image}
                width={620}
                height={220}
                src={`https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
              />
            </Row>

            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Hola {userFirstName},
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Gracias por programar la reunión con {businessName}
                </Heading>

                <Text style={paragraph}>Detalles de la reunión:</Text>

                <Text style={paragraph}>
                  <b>Hora: </b>
                  {meetingTime}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Fecha: </b>
                  {date}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Ubicación: </b>
                  {meetingUrl}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Duración: </b>
                  {duration}
                </Text>
                <Text
                  style={{
                    color: "rgb(0,0,0, 0.5)",
                    fontSize: 14,
                    marginTop: -5,
                  }}
                >
                  *Please Join meeting on above details{" "}
                  <Link href="https://zoom.us/es">https://zoom.us/es</Link>
                  {businessName}
                </Text>
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: "0" }}>
              <Column style={containerButton} colSpan={2}>
                <Link href={meetingUrl}>
                  <Button style={button}>Únete ahora</Button>
                </Link>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default Email;

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: "30px 20px",
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#0069ff",
  borderRadius: 6,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  padding: ".75rem 1.5rem",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const image = {
  maxWidth: "100%",
  objectFit: "cover",
};

const boxInfos = {
  padding: "20px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};
