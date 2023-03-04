import { css, useTheme } from "@emotion/react";
import { Box, Toolbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";

import { ConnectWalletButton } from "../features/wallet/components/ConnectWalletButton";

import { useMQ } from "../hooks/useMQ";

export function AppHeader() {
  const theme = useTheme();
  const { isXsSize } = useMQ();

  const styles = {
    appBar: css`
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
      margin-left: -40px;
      width: calc(100% + 80px);
      box-shadow: unset;
    `,
    toolBar: css`
      padding-left: 48px !important;
      padding-right: 48px !important;
    `,
    humaLogo: css`
      height: 40px;
      width: auto;
      cursor: pointer;
    `,
  };

  return (
    <AppBar css={styles.appBar} position="static" color="secondary">
      <Toolbar css={styles.toolBar}>
        <ConnectWalletButton />
      </Toolbar>
    </AppBar>
  );
}
