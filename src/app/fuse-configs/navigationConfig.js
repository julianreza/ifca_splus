import axios from 'axios';

const params = {
    "entity_cd":"1500",
	"project_no":"1502"
}

let navigationConfig = []

axios.post('http://35.198.219.220:2121/alfaAPI/c_menu',params, {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})
.then(function (response) {
    let data = response.data
    
    let parent = data.filter(data => data.ParentMenuID === 0)
    parent.forEach((element, i) => {
        if(element.URL){
            navigationConfig.push({
                'id'   : 'id'+element.MenuID,
                'title': element.Title,
                'type' : 'item',
                'icon' : element.IconReact,
                'url'  : '/'+element.URL_React
            })
        }
        else{
            let child = data.filter(data => data.ParentMenuID === element.MenuID)
            let childarry = []
            child.forEach((element2, i) => {
                if(element2.URL){
                    childarry.push({
                        'id'   : 'id'+element2.MenuID,
                        'title': element2.Title,
                        'type' : 'item',
                        'icon' : element.IconReact,
                        'url'  : '/'+element2.URL_React
                    })
                }
                else{
                    let child2 = data.filter(data => data.ParentMenuID === element2.MenuID)
                    let childarry2 = []
                    child2.forEach((element3, i) => {
                        if(element3.URL){
                            childarry2.push({
                                'id'   : 'id'+element3.MenuID,
                                'title': element3.Title,
                                'type' : 'item',
                                'icon' : element.IconReact,
                                'url'  : '/'+element3.URL_React
                            })
                        }
                        else{
                            childarry2.push({
                                'id'        : 'id'+element3.MenuID,
                                'title'     : element3.Title,
                                'type'      : 'collapse',
                                'icon'      : element.IconReact,
                                'children'  : []
                            })
                        }
                    })
                    childarry.push({
                        'id'        : 'id'+element2.MenuID,
                        'title'     : element2.Title,
                        'type'      : 'collapse',
                        'icon'      : element.IconReact,
                        'children'  : childarry2
                    })
                }
            })

            navigationConfig.push({
                'id'        : 'id'+element.MenuID,
                'title'     : element.Title,
                'type'      : 'collapse',
                'icon'      : element.IconReact,
                'children'  : childarry
            })
        }
    });
})
.catch(function (error) {
    console.log(error);
})

export default navigationConfig;
