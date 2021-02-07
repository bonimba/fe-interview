import React from 'react';
import { Tabs} from './shared/components/Tabs';
import { MerchantPage } from './pages/MerchantPage';
import { useMerchants } from './pages/useMerchants';
import { Merchant } from './pages/Merchants';

import './App.scss';

const App: React.FunctionComponent = () => {
  const [merchants, setMerchants] = useMerchants();

  function onMerchantChange(id: Merchant['id']) {
    setMerchants(merchants => {
      const updatedMerchants = [...merchants];
      const updatedMerchantIndex = updatedMerchants.findIndex(merchant => merchant.id === id);
      const updatedMerchant = updatedMerchants[updatedMerchantIndex];
      updatedMerchants[updatedMerchantIndex] = { ...updatedMerchant, isBill: !updatedMerchant.isBill }
      return updatedMerchants;
    })
  }

  const tabs = [
    { name: 'Bills', content: <MerchantPage merchants={merchants} onMerchantChange={onMerchantChange} isBill /> },
    { name: 'Potential bills', content: <MerchantPage merchants={merchants} onMerchantChange={onMerchantChange} isBill={false} /> },
  ];
  
  return <Tabs tabs={tabs} className="tabs-container" />
}


export default App;
