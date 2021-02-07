import { useEffect, useState } from "react"

import { getApiUrl } from "../shared/hooks";
import { Merchant } from "./Merchants";

import './MerchantPage.scss';

interface MerchantPageProps {
  merchants: ReadonlyArray<Merchant>;
  isBill: boolean;
  onMerchantChange: (id: Merchant['id']) => void;
}

async function changeMerchantStatus(merchant: Merchant) {
  try {
    await fetch(getApiUrl(`merchants/${merchant.id}`),
      { 
        method: 'PATCH',
        body: JSON.stringify({ ...merchant, isBill: !merchant.isBill })
      }
    );
  } catch(error) {
    // I should add an Error Boundry to handle this properly
    throw new Error(error);
  }
}

export function MerchantPage({ isBill, merchants, onMerchantChange }: MerchantPageProps) {
  return (
    <div>
      <ul>
        {merchants.filter(merchant => merchant.isBill === isBill).map(merchant => (
          <li key={merchant.id}>
            <MerchantRow merchant={merchant} onMerchantChange={onMerchantChange} />
          </li>)
        )}
      </ul>
    </div>
  );
}

interface MerchantRowProps {
  merchant: Merchant;
  onMerchantChange: (id: string) => void;
}

function MerchantRow({ merchant, onMerchantChange }: MerchantRowProps) {
  const [showTransactions, setShowTransactions] = useState(false);
  const [changeBillStatus, setChangeBillStatus] = useState(false);
  const { name, iconUrl, transactions, isBill } = merchant;

  useEffect(() => {
    async function changeStatus() {
      if (changeBillStatus === true) {
        await changeMerchantStatus(merchant);
        setChangeBillStatus(false);
        onMerchantChange(merchant.id);
      }
    }

    changeStatus();
  })

  return (
    <>
      <button className="merchant-row-container" type="button" onClick={() => setShowTransactions(showTransactions => !showTransactions)}>
        {iconUrl !== null && <img src={iconUrl} alt={`${name}'s logo`} height='25'/>}
        <strong>{name}</strong>
        <div>{transactions.length}</div>
        {showTransactions && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(({ id, amount, date }) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td><time dateTime={date}>{date}</time></td>
                    <td>£{amount}</td>
                  </tr>)
                  )
                }
              </tbody>
            </table>
          </div>
        )}
      </button>
      <button className="merchant-row-action-button" type="button" onClick={() => setChangeBillStatus(true)}>{isBill ? 'Remove bill' : 'Add as bill'}</button>
  </>
  );
}