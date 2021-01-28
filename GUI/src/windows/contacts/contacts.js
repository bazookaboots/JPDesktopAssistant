
function ListContacts(data)
{
    for (i = 0; i < 4; i++) {
        let item = document.createElement('div');
        item.innerHTML = data[i].Name;
        document.getElementById("list").appendChild(item)
    }
}

function init(){
    var contacts;
    contacts = GetContacts(ListContacts);

}