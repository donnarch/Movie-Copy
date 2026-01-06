import axios from "./api";

let Api_Key =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjkxOTNiNzkzNTBlOTliNGFhNjNkZjRmN2JlYjdmYyIsIm5iZiI6MTc1MjA0OTc0OC45OCwic3ViIjoiNjg2ZTI4NTQ5MmJjYzRiYWRlNmU4Yzg5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.vG6XZs3MsR0-kOOz1FQPxF2Zu0Ddw4rnkw7PCS9D9AI";

const options = {
  headers: {
    Authorization: Api_Key,
  },
};

const Api_Service = {
  GetData: async (url) => {
    const data = await axios.get(url, options); 
    return data.data;
  },
};

export default Api_Service;
