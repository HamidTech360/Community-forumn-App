import React, {useState} from 'react'
import styles from '../../../styles/templates/new-group/settings.module.css'
import { Form } from 'react-bootstrap'

const Settings = ()=>{

    const [privacy, setPrivacy] = useState([
        {
            title:'Public group',
            active:false,
            lists:[
                'Any site member can join this group.', 
                'This group will be listed in the groups directory and in search results.',
                ' Group content and activity will be visible to any site member.'
            ]
        },
        {
            title:'Private group',
            active:false,
            lists:[
                'Only people who request membership and are accepted can join the group.',
                 'This group will be listed in the groups directory and in search results.',
                  'Group content and activity will only be visible to members of the group.'
            ]
        },
        {
            title:'Public group',
            active:false,
            lists:[
                'Only people who are invited can join the group.',
                ' This group will not be listed in the groups directory or search results.' ,
                'Group content and activity will only be visible to members of the group.'
            ]
        },
    ])

    const selectItem= (array,setArray, item, i)=>{
        const clone = [...array]
        clone.map(item=>item.active=false)
        clone[i].active=true
        setArray(clone)
        console.log(item);
        
    }
    return (
        <div className={styles.settings}>
            <div className={styles.settingsHeader}>Privacy Settings</div>
            <hr />

            {privacy.map((item, i)=>
            <div key={i} className={styles.groupType}>
                <div className={styles.groupTypeHeader}>{item.title}</div> 
                <div
                    onClick={()=>selectItem(privacy, setPrivacy, item, i)}
                    className={`${styles.radio} ${item.active?styles.radioActive:''}`}
                />
                <div className={styles.groupDescriptions}>
                    <ul>
                       {item.lists.map((item, i)=> <li key={i}>{item}</li>)}
                    </ul>
                </div>
            </div>
            )}

            <div className={styles.settingsHeader} style={{marginTop:'40px'}}>Invites</div>
            <hr />
        
        </div>
    )
}

export default Settings