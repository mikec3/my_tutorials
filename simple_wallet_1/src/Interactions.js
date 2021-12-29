import {React, useState, useEffect} from 'react'
import {ethers} from 'ethers'
import styles from './Wallet.module.css'


const Interactions = (props) => {

	const [transferHash, setTransferHash] = useState(null);

	const transferHandler = async (e) => {
		e.preventDefault();
		let transferAmount = e.target.sendAmount.value;
		let recieverAddress = e.target.recieverAddress.value;

		let txt = await props.contract.transfer(recieverAddress, transferAmount);
		setTransferHash(txt.hash);
	}
	
return (
			<div className={styles.interactionsCard}>
				<form onSubmit={transferHandler}>
					<h3> Transfer Coins </h3>
						<p> Reciever Address </p>
						<input type='text' id='recieverAddress' className={styles.addressInput}/>

						<p> Send Amount </p>
						<input type='number' id='sendAmount' min='0' step='1'/>

						<button type='submit' className={styles.button6}>Send</button>
						<div>
							{transferHash}
						</div>
			</form>
			</div>
		)
}

export default Interactions;