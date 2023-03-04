import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";
import { useContractWrite, usePrepareContractWrite, useSigner } from "wagmi";
import { ethers } from "ethers";

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0E76FD",
  borderColor: "#0063cc",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

export default function DepositBtn() {
  const { data: signer } = useSigner({ chainId: 5 });

  const submitDepositHandler = async () => {
    if (signer == undefined) return;

    const contract = new ethers.Contract(
      "0x740f89afcCD03A9296D97802859Ec22249349B46",
      ["function createItem(string) payable internal returns (bool)"],
      signer
    );
    try {
      await contract.createItem("__", { value: 1 });
    } catch (error) {}
  };

  return (
    <BootstrapButton
      onClick={submitDepositHandler}
      variant="contained"
      disableRipple
    >
      Deposit
    </BootstrapButton>
  );
}
