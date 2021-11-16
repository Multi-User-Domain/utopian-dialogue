import React, { useState, useEffect } from "react";
import { LoginButton } from "@inrupt/solid-ui-react";
import {
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  Container,
  Text
} from "@chakra-ui/react";

export function LoginForm({
  defaultIdP = "https://inrupt.net",
  redirectUrl = "http://localhost:3000",
}): React.ReactElement {
  const [idp, setIdp] = useState(defaultIdP);

  return (
    <Container fixed="true">
      <Text marginTop={10} marginBottom={10}>The <b>Identity provider</b> is where your Solid Pod is stored</Text>
      <InputGroup>
        <Input
          label="Identity Provider"
          placeholder="Identity Provider"
          type="url"
          value={idp}
          onChange={(e) => setIdp(e.target.value)}
        />
        <InputRightAddon>
          <LoginButton oidcIssuer={idp} redirectUrl={redirectUrl}>
            <Button variant="contained" color="primary">
              Log&nbsp;in or Signup
            </Button>
          </LoginButton>
        </InputRightAddon>
      </InputGroup>
      <Text marginTop={10} marginBottom={10}>If you don't have a Solid Pod yet, the default provider has been set to the creators of Solid, who will host it for free :-)</Text>
    </Container>
  );
}
