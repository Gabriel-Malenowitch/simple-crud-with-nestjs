/* eslint-disable */
const view = document.getElementById('view');
const getViewData = ()=> {
    // @ts-ignore
    const username = String(document.getElementById('username')?.getAttribute('data-kwcachedvalue'));
    // @ts-ignore
    const password = String(document.getElementById('password')?.getAttribute('data-kwcachedvalue'));
    // @ts-ignore
    const id = document.getElementById('id')?.getAttribute('data-kwcachedvalue');

    return { username, password, id };
}

const get = (data) => fetch('user').then((res) => res.json());
const put = (id, data) => fetch('user/' + id, { body: JSON.stringify(data), method: 'PUT' });
const del = (id) => fetch('user/' + id, { method: 'DELETE' });
const post = (data) => fetch('user', { method: 'POST', body: JSON.stringify(data) });

const setView = async () => {
    const data = await get().catch(e=>e)
    // @ts-ignore
    view.innerText = `${JSON.stringify(data, null, 2)}`;
}

document.getElementById('put')?.addEventListener('click', ()=>{
    const { username, password, id } = getViewData();
    put(id, { username, password });
    setView()
})
document.getElementById('post')?.addEventListener('click', ()=>{
    const { username, password } = getViewData();
    post({ username, password });
    setView()
})
document.getElementById('del')?.addEventListener('click', ()=>{
    const { id } = getViewData();
    del(id);
    setView()
})
setView()