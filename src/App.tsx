import '@ethersproject/shims';
import '@walletconnect/react-native-compat';

import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {
  createWeb3Modal,
  defaultConfig,
  W3mButton,
  Web3Modal,
} from '@web3modal/ethers5-react-native';
import {FlexView, Text} from '@web3modal/ui-react-native';

import {SendTransaction} from './views/SendTransaction';
import {SignMessage} from './views/SignMessage';
import {SignTypedDataV4} from './views/SignTypedDataV4';
import {ENV_PROJECT_ID} from '@env';

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = ENV_PROJECT_ID;

// 2. Create config
const metadata = {
  name: 'HAQQ Test DAPP',
  description: 'HAQQ RN DAPP with WalletConnect v2 & Ethers v5',
  url: 'https://haqq.network',
  icons: ['https://haqq.network/assets/media-kit/haqq-sign.png'],
  redirect: {
    native: 'haqq-test-dapp://',
  },
};

const config = defaultConfig({
  metadata,
  extraConnectors: [],
});

// 3. Define your chains
const chains = [
  {
    chainId: 11235,
    name: 'Mainnet',
    currency: 'ISLM',
    explorerUrl: 'https://explorer.haqq.network',
    rpcUrl: 'https://rpc.eth.haqq.network',
  },
  {
    chainId: 54211,
    name: 'TestEdge2',
    currency: 'ISLM',
    explorerUrl: 'https://explorer.testedge2.haqq.network',
    rpcUrl: 'https://rpc.eth.testedge2.haqq.network',
  },
];

const clipboardClient = {
  setString: async (value: string) => {
    Clipboard.setString(value);
  },
};

// 3. Create modal
createWeb3Modal({
  projectId,
  chains,
  config,
  clipboardClient,
  enableAnalytics: false,
  chainImages: {
    11235: 'https://haqq.network/assets/media-kit/islamic-mark.png',
    54211: 'https://haqq.network/assets/media-kit/islamic-mark.png',
  },
});

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title} variant="large-600">
        HAQQ Test DAPP
      </Text>
      <FlexView style={styles.buttonContainer}>
        <W3mButton balance="show" />
        <SignMessage />
        <SendTransaction />
        <SignTypedDataV4 />
      </FlexView>
      <Web3Modal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 16,
  },
  buttonContainer: {
    gap: 8,
  },
  title: {
    marginBottom: 40,
    fontSize: 30,
  },
});

export default App;
