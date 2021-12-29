import {React, useState, useEffect} from 'react'
import {ethers} from 'ethers'
import styles from './Wallet.module.css'
import simple_token_abi from './Contracts/simple_token_abi.json'
import Interactions from './Interactions';

const Wallet = () => {

	// ganache-cli address
	const contractAddress = '0xC141334a57DDd61Dda76A0dA32fe750E7Cb7f81B';

	const [tokenName, setTokenName] = useState("Token");
	const [connButtonText, setConnButtonText] = useState("Connect Wallet");
	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [balance, setBalance] = useState(null);

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);


	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch(error => {
				setErrorMessage(error.message);
			})


		} else {
			console.log('need to install metamask');
			setErrorMessage('Please install MetaMask');
		}
	}

	const accountChangedHandler = (newAddress) => {
		setDefaultAccount(newAddress);
		updateEthers();
	}

	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);

		let tempSigner = tempProvider.getSigner();

		let tempContract = new ethers.Contract(contractAddress, simple_token_abi, tempSigner)

		setProvider(tempProvider);
		setSigner(tempSigner);
		setContract(tempContract);
	}

	useEffect(() => {
		if (contract != null) {
			updateBalance();
			updateTokenName();
		}
	}, [contract])

	const updateBalance = async () => {
		let balanceBigN = await contract.balanceOf(defaultAccount);
		let balanceNumber = balanceBigN.toNumber();

		let decimals = await contract.decimals();

		let tokenBalance = balanceNumber / Math.pow(10, decimals);

		setBalance(tokenBalance);
		console.log(tokenBalance);
	}

	const updateTokenName = async () => {
		setTokenName(await contract.name());
	}
	
return (
	<div>
		<h2> {tokenName + " ERC-20 Wallet"} </h2>
		<button className={styles.button6} onClick={connectWalletHandler}>{connButtonText}</button>

		<div className = {styles.walletCard}>
			<div>
				<h3>Address: {defaultAccount}</h3>
			</div>
			<div>
				<h3>{tokenName} Balance: {balance}</h3>
			</div>
			{errorMessage}
			</div>

			<Interactions contract={contract}/>
	</div>
	);
}

export default Wallet;