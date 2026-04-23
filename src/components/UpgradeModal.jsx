import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { X, Wallet, Check, ExternalLink, TrendingUp, Users, Zap } from 'lucide-react';
import {
  CONTRACTS, LOGIC_CONTRACTS, FACTORY_FEE, UPGRADE_PORTAL_ABI,
  ERC721_ABI, BNB_MAINNET,
} from '../config/contracts';
import { truncateAddress } from '../utils/formatting';

const TEMPLATE_ICONS = {
  hunter: <Zap size={18} />,
  trading: <TrendingUp size={18} />,
  cto: <Users size={18} />,
};

export default function UpgradeModal({ nft, account, onClose, onSuccess }) {
  const [step, setStep] = useState(account ? 'pick' : 'connect');
  const [signer, setSigner] = useState(null);
  const [portalFee, setPortalFee] = useState(null);
  const [isReactivation, setIsReactivation] = useState(false);
  const [error, setError] = useState(null);
  const [txHash, setTxHash] = useState(null);
  const [agentAddress, setAgentAddress] = useState(null);

  useEffect(() => {
    if (account && window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const s = provider.getSigner();
      setSigner(s);
      loadFee(s);
    }
  }, [account]);

  const loadFee = async (s) => {
    try {
      const portal = new ethers.Contract(CONTRACTS.NFTUpgradePortal, UPGRADE_PORTAL_ABI, s);
      const fee = await portal.getUpgradeFee();
      setPortalFee(fee);
      const prev = await portal.getPreviousAgent(nft.contractAddress, nft.tokenId);
      setIsReactivation(prev !== ethers.constants.AddressZero);
    } catch {}
  };

  const connectWallet = async () => {
    try {
      setError(null);
      if (!window.ethereum) { setError('Install MetaMask'); return; }
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
      const s = provider.getSigner();
      setSigner(s);
      await loadFee(s);
      setStep('pick');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpgrade = async (template) => {
    if (!signer || !portalFee) return;
    try {
      setStep('upgrading');
      setError(null);

      const nftContract = new ethers.Contract(nft.contractAddress, ERC721_ABI, signer);
      const portal = new ethers.Contract(CONTRACTS.NFTUpgradePortal, UPGRADE_PORTAL_ABI, signer);

      const approved = await nftContract.getApproved(nft.tokenId);
      if (approved.toLowerCase() !== CONTRACTS.NFTUpgradePortal.toLowerCase()) {
        const approveTx = await nftContract.approve(CONTRACTS.NFTUpgradePortal, nft.tokenId);
        await approveTx.wait();
      }

      const agentName = `${nft.collectionName} ${template.name.split(' ')[0]}`;
      const agentSymbol = `${nft.collectionSymbol.slice(0, 4)}${template.key[0].toUpperCase()}`;
      const totalFee = isReactivation
        ? portalFee
        : portalFee.add(ethers.utils.parseEther(FACTORY_FEE));

      const params = {
        collection: nft.contractAddress,
        tokenId: ethers.BigNumber.from(nft.tokenId),
        agentName, agentSymbol,
        logicAddress: template.address,
        metadataURI: nft.tokenURI || '',
      };

      const tx = await portal.upgrade(params, { value: totalFee });
      setTxHash(tx.hash);
      const receipt = await tx.wait();

      const event = receipt.events?.find(
        (e) => e.event === 'NFTUpgraded' || e.event === 'NFTReactivated'
      );
      if (event) setAgentAddress(event.args.agentContract);

      setStep('done');
      onSuccess?.();
    } catch (err) {
      setError(err.reason || err.message || 'Upgrade failed');
      setStep('pick');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="modal-nft-preview">
          {nft.image && <img src={nft.image} alt="" className="modal-nft-image" />}
          <div>
            <div className="modal-nft-name">{nft.collectionName} #{nft.tokenId}</div>
            <div className="mono text-muted" style={{ fontSize: '12px' }}>
              {truncateAddress(nft.contractAddress)}
            </div>
          </div>
        </div>

        {step === 'connect' && (
          <div className="modal-step">
            <h3>Connect your wallet</h3>
            <p>Sign transactions to approve and upgrade this NFT.</p>
            <button className="btn btn-primary btn-full" onClick={connectWallet}>
              <Wallet size={16} />
              <span>Connect Wallet</span>
            </button>
          </div>
        )}

        {step === 'pick' && (
          <div className="modal-step">
            <h3>Choose agent type</h3>
            <div className="template-grid">
              {LOGIC_CONTRACTS.map((t) => (
                <button key={t.key} className="template-card" onClick={() => handleUpgrade(t)}>
                  <div className="template-icon">{TEMPLATE_ICONS[t.key]}</div>
                  <div className="template-body">
                    <div className="template-name">{t.name}</div>
                    <div className="template-desc">{t.desc}</div>
                  </div>
                </button>
              ))}
            </div>
            <p className="modal-fee">
              {isReactivation ? 'Reactivation' : 'Upgrade'} fee:{' '}
              <strong>{isReactivation ? '0.005' : '0.015'} BNB</strong>
            </p>
          </div>
        )}

        {step === 'upgrading' && (
          <div className="modal-step modal-center">
            <div className="spinner" />
            <h3>Upgrading your NFT</h3>
            {txHash && (
              <a href={`https://bscscan.com/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="tx-link">
                <span>View on BscScan</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        )}

        {step === 'done' && (
          <div className="modal-step modal-center">
            <div className="done-icon">
              <Check size={28} strokeWidth={3} />
            </div>
            <h3>NFT Upgraded</h3>
            <p>Your dead NFT is now a BAP-578 AI agent.</p>
            <a
              href="https://bortagent.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-full"
            >
              <span>Manage on bortagent.xyz</span>
              <ExternalLink size={14} />
            </a>
            {txHash && (
              <a href={`https://bscscan.com/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="tx-link">
                <span>View transaction</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        )}

        {error && <p className="modal-error">{error}</p>}
      </div>
    </div>
  );
}
