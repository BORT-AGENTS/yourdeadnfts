import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import AddressInput from './components/AddressInput';
import ScanResults from './components/ScanResults';
import UpgradeModal from './components/UpgradeModal';
import { scanWallet } from './utils/scanner';
import { BNB_MAINNET } from './config/contracts';
import './styles/index.css';

function App() {
  const [account, setAccount] = useState(null);
  const [searchAddress, setSearchAddress] = useState('');
  const [scanState, setScanState] = useState('idle');
  const [deadNFTs, setDeadNFTs] = useState([]);
  const [progress, setProgress] = useState('');
  const [selectedNFT, setSelectedNFT] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const addr = params.get('address');
    if (addr && ethers.utils.isAddress(addr)) {
      handleScan(ethers.utils.getAddress(addr));
    }
  }, []);

  const handleScan = useCallback(async (address) => {
    setSearchAddress(address);
    setScanState('scanning');
    setDeadNFTs([]);
    setProgress('Starting scan...');
    window.history.replaceState(null, '', `?address=${address}`);

    try {
      const results = await scanWallet(address, setProgress);
      setDeadNFTs(results);
      setScanState('done');
      if (results.length === 0) {
        toast.info('No dead NFTs found in this wallet');
      } else {
        toast.success(`Found ${results.length} dead NFT${results.length > 1 ? 's' : ''}`);
      }
    } catch (err) {
      console.error('Scan failed:', err);
      toast.error('Scan failed. Try again.');
      setScanState('idle');
    }
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) { toast.error('Install MetaMask'); return; }
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== BNB_MAINNET.chainId) {
        try {
          await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: BNB_MAINNET.chainId }] });
        } catch {
          await window.ethereum.request({ method: 'wallet_addEthereumChain', params: [BNB_MAINNET] });
        }
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const addr = await signer.getAddress();
      setAccount(addr);
      handleScan(addr);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const disconnectWallet = () => setAccount(null);

  const handleBack = () => {
    setScanState('idle');
    setDeadNFTs([]);
    setSearchAddress('');
    window.history.replaceState(null, '', '/');
  };

  return (
    <div className="app">
      <div className="bg-orbs">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
      </div>
      <div className="topo-bg" />
      <Header account={account} onConnectWallet={connectWallet} onDisconnect={disconnectWallet} onHome={handleBack} />
      <main className="main">
        {scanState === 'idle' && (
          <AddressInput onScan={handleScan} scanning={false} onConnectWallet={connectWallet} />
        )}
        {(scanState === 'scanning' || scanState === 'done') && (
          <ScanResults
            address={searchAddress}
            deadNFTs={deadNFTs}
            scanning={scanState === 'scanning'}
            progress={progress}
            account={account}
            onUpgrade={setSelectedNFT}
            onBack={handleBack}
          />
        )}
      </main>

      {selectedNFT && (
        <UpgradeModal
          nft={selectedNFT}
          account={account}
          onClose={() => setSelectedNFT(null)}
          onSuccess={() => {
            setSelectedNFT(null);
            if (searchAddress) handleScan(searchAddress);
          }}
        />
      )}

      <footer className="footer">
        <span className="footer-credit">Powered by <a href="https://x.com/BortOnBsc" target="_blank" rel="noopener noreferrer">BORT</a></span>
        <nav className="footer-links">
          <a href="/pitch.pdf" target="_blank" rel="noopener noreferrer">pitch</a>
          <a href="https://x.com/yourdeadnfts" target="_blank" rel="noopener noreferrer">@yourdeadnfts</a>
          <a href="https://bortagent.xyz" target="_blank" rel="noopener noreferrer">bortagent.xyz</a>
        </nav>
      </footer>
      <ToastContainer position="top-right" autoClose={4000} theme="dark" />
    </div>
  );
}

export default App;
