import React, { useState } from "react";
import { LoginButton } from "@inrupt/solid-ui-react";
import {
  Button,
  Center,
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
  const [showAdvancedContent, setShowAdvancedContent] = useState(false);

  let content = null;

  if(showAdvancedContent) {
    content = (
      <>
      <Text marginBottom={15}>The identity provider below is hosted by Inrupt, who will provide free hosting for Solid accounts, but you can also chnage this value to another provider</Text>
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
      </>
    );
  }
  else {
    content = (
      <>
      <Container marginBottom={10} marginTop={20}>
        <Center>
          <LoginButton oidcIssuer={idp} redirectUrl={redirectUrl}>
            <Button variant="contained" color="primary" border="2px" borderColor='green.500'>
              Signup
            </Button>
          </LoginButton>
        </Center>
      </Container>
      <Container>
        <Center>
          <Button size="sm" onClick={() => setShowAdvancedContent(true)}>Configure Provider (Advanced)</Button>
        </Center>
      </Container>
      </>
    );
  }

  return (
    <Container fixed="true">
      {content}
    </Container>
  );
}
