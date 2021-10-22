import React, {useContext, useState} from 'react';
import { IService } from '../api/api';

import { Tree } from 'primereact/tree';
import { ServiceContext } from '../Context/ServiceContext';
import { ITreeNode } from '../../Shared/Models/TreeNode';

export function ServiceTreeComponent() {
    const { items, setCurrentItem } = useContext(ServiceContext);
    const [expandedKeys, setExpandedKeys] = useState({});
    const [selectedKey, setSelectedKey] = useState({});
    
    const expandAll = () => {
        if (!items) {
            return;
        }
        let _expandedKeys = {};
        for (let node of items) {
            expandNode(node, _expandedKeys);
        }

        setExpandedKeys(_expandedKeys);
    }

    const expandNode = (node:any, _expandedKeys:any) => {
        if (node.children && node.children.length) {
            _expandedKeys[node.key] = true;

            for (let child of node.children) {
                expandNode(child, _expandedKeys);
            }
        }
    }

    const collapseAll = () => {
        setExpandedKeys({});
    }

    const onNodeSelect = (node:ITreeNode<IService>|any) => {
        if (setCurrentItem) {
            setCurrentItem(node.node)
        }
    }

    const onNodeUnselect = (node:ITreeNode<IService>|any) => {
        
    }
    
    
    return (
        <React.Fragment>
            {items && <Tree selectionMode="single"
                            selectionKeys={selectedKey} 
                            onSelectionChange={e => setSelectedKey(e.value)} onSelect={onNodeSelect} onUnselect={onNodeUnselect}
                            value={items} expandedKeys={expandedKeys}
                            onToggle={e => setExpandedKeys(e.value)} 
                            style={{border:'0!important', minWidth:'100%'}}
                            contentStyle={{border:'0!important'}}/>}
        </React.Fragment>
    )
}