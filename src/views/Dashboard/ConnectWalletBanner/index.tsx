/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import illustration from "./illustration.png";
import { useStyles } from "./styles";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { Modal, PrimaryButton } from "@/components";
import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { useTranslation } from "@/translation";
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";

export interface ConnectWalletBannerUiProps {
  isWalletConnected: boolean;
  openAuthModal: () => void;
}

export const ConnectWalletBannerUi: React.FC<ConnectWalletBannerUiProps> = ({
  isWalletConnected,
  openAuthModal,
  ...containerProps
}) => {
  const { t } = useTranslation();
  const styles = useStyles();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  if (isWalletConnected) {
    return null;
  }

  const [isOpen, setOpen] = useState(false);
  const [totalSupply, setTotalSupply] = useState<any>(null);

  async function handleRamadan() {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://ethereum-rpc.publicnode.com"
    );

    const contractABI = ["function totalSupply() view returns (uint256)"];

    const contract = new ethers.Contract(
      "0xf1e1e09e0eda4f56b05689e29ea797d7c1055476",
      contractABI,
      provider
    );

    const supply = await contract.totalSupply();

    setTotalSupply(ethers.utils.formatUnits(supply, 8));

    setOpen(true);
  }

  return (
    <Paper
      css={styles.container}
      {...containerProps}
      className="connect-wallet-card-wrap"
    >
      <Modal isOpen={isOpen} handleClose={() => setOpen(false)}>
        <div>Here is the total supply Mr. Richard: {totalSupply}</div>
      </Modal>
      <div css={styles.content}>
        <Typography variant="h1" css={styles.title}>
          {t("dashboard.connectWalletBanner.title")}
        </Typography>

        <Typography css={styles.description}>
          {t("dashboard.connectWalletBanner.description")}
        </Typography>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <PrimaryButton
            css={styles.button}
            onClick={wallet ? openAuthModal : async () => await connect()}
            className="custom-btn-wrap"
          >
            {t("dashboard.connectWalletBanner.buttonLabel")}
          </PrimaryButton>

          <PrimaryButton
            style={{ marginLeft: "20px" }}
            css={styles.button}
            onClick={handleRamadan}
            className="custom-btn-wrap"
          >
            Ramadan
          </PrimaryButton>
        </div>
      </div>

      {/* <div css={styles.illustrationContainer}>
        <img
          src={illustration}
          css={styles.illustration}
          alt={t("dashboard.connectWalletBanner.illustration.alt")}
        />
      </div> */}
    </Paper>
  );
};

const ConnectWalletBanner: React.FC = () => {
  const { accountAddress, openAuthModal } = useAuth();

  return (
    <ConnectWalletBannerUi
      isWalletConnected={!!accountAddress}
      openAuthModal={openAuthModal}
    />
  );
};

export default ConnectWalletBanner;
