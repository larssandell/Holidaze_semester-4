import React from 'react';
import { Tabs, Tab } from '@mui/material';

function TabComp({ tabs, activeTab, onChange, venueManager }) {
    return (
        <Tabs value={activeTab} onChange={onChange} variant='fullWidth'>
            {tabs.map((tab, index) => (
                <Tab
                    key={index}
                    label={tab.label}
                    value={tab.value}
                    disabled={tab.value === 1 && !venueManager}
                />
            ))}
        </Tabs>
    );
}

export default TabComp;
