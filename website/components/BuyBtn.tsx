import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";
import { useContractWrite, usePrepareContractWrite, useSigner } from "wagmi";
import { ethers } from "ethers";
import cogoToast from "cogo-toast";
import React, { useState } from "react";
import Link from "@mui/material/Link";

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

export default function BuyBtn() {
  const [showDiv, setShowDiv] = useState(false);

  const { data: signer } = useSigner({ chainId: 5 });

  const submitDepositHandler = async () => {
    if (signer == undefined) return;

    const contract = new ethers.Contract(
      "0x740f89afcCD03A9296D97802859Ec22249349B46",
      ["function createItem(string) payable internal returns (bool)"],
      signer
    );

    try {
      const tx = await contract.createItem("---", { value: 1 });
      console.log(tx);
      const receipt = await tx.wait();
      console.log("Transaction receipt");
      console.log(receipt);

      cogoToast.success("Order purchase completed!");
      setShowDiv(!showDiv);
    } catch (error) {}
  };

  return (
    <div>
      {!showDiv ? (
        <BootstrapButton
          onClick={submitDepositHandler}
          variant="contained"
          disableRipple
        >
          Buy Bundle
        </BootstrapButton>
      ) : (
        <Link
          href="https://bumblebee-raccoon-m7we.squarespace.com/nft1"
          target="_blank"
          underline="hover"
        >
          Claim your NFT now!
        </Link>
      )}
    </div>
  );
}
