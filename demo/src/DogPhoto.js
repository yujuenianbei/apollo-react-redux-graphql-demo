import React, { Component, Fragment } from 'react'
import logo from './logo.svg';
import './App.css';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";


const GET_DOG_PHOTO = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;
// 通过props传入数据
// class DogPhoto extends Component {
//     render() {
//         return (
//             <Query query={GET_DOG_PHOTO} variables={{ breed: this.props.breed }}>
//                 {({ loading, error, data, refetch }) => {
//                     if (loading) return null;
//                     if (error) return `Error! ${error}`;
//                     return (
//                         <div>
//                             <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
//                         </div>
//                     );
//                 }}
//             </Query>
//         )
//     }
// };

// 通过传参的方式传入数据（和props一样）
const DogPhoto = ({ breed }) => (
    <Query
        query={GET_DOG_PHOTO} //查询语句
        variables={{ breed }} //传入参数
        skip={!breed} //
    // pollInterval={500} //　轮询时间　如果传入0，查询将不会轮询
        notifyOnNetworkStatusChange  //查询组件在重新加载时重新呈现
        errorPolicy={'all'}
    >
        {({ 
            loading, 
            error, 
            data, 
            refetch, //refetch接受变量，但如果我们不传入新变量，它将使用我们之前查询中的相同变量　用户手动进行轮询
            startPolling, //开始轮询
            stopPolling, //结束轮询
            networkStatus, //结果对象的属性提供有关查询状态的细粒度信息  是一个枚举，其数字值为1-8，表示不同的加载状态
            
        }) => {
            if (networkStatus === 4) return "Refetching!";
            if (loading) return null;
            if (error) return `Error! ${error}`;

            return (
                // <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
                <div>
                    <img
                        src={data.dog.displayImage}
                        style={{ height: 100, width: 100 }}
                    />
                    <button onClick={() => refetch()}>Refetch!</button>
                </div>
            );
        }}
    </Query>
);


export default DogPhoto;
