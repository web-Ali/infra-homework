const axios =  require("axios");

const instance = axios.create({
    baseURL: 'https://api.tracker.yandex.net',
    headers: {
        'Authorization': 'OAuth y0_AgAAAAA2_F4IAAiPagAAAADTKOiW4Z8_AeU4Qqm3bVTh30USRAOjuYw',
        'X-Org-ID': '52232defb5db44119cd5f5073ed68339'
    }
});

const api = {
    patchTicket: (data)=> instance.patch(`/v2/issues/${ticketId}`,JSON.stringify(data)),
    postComment:(text)=> instance.post(`/v2/issues/comments`,JSON.stringify(text))
}

