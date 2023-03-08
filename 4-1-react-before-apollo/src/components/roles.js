import './components.css';
import { useState } from 'react';
import { useQuery,gql } from '@apollo/client';
import { AsideItemsContent } from '../commonComp/aside';

const GET_ROLES = gql`
  query GetRoles {
    roles {
      id
    }
  }
`;

const GET_ROLE = gql`
  query GetRole($id: ID!) {
    role(id: $id) {
      id
      requirement
      members {
        id
        last_name
        serve_years
      }
      equipments {
        id
      }
      softwares {
        id
      }
    }
  }
`;


function Roles({mainComp}) {

    const [contentId, setContentId] = useState('');

    function AsideItems () {
      const { loading, error, data } = useQuery(GET_ROLES);

      return (<AsideItemsContent mainComp={mainComp} data={data} loading={loading} error={error} setContentId={setContentId} contentId={contentId} />       )

  }

    function MainContents () {

        const { loading, error, data } = useQuery(GET_ROLE, {
          variables: {id: contentId}
        })
    
        if (loading) return <p className="loading">Loading...</p>
        if (error) return <p className="error">Error :(</p>
        if (contentId === '') return (<div className="roleWrapper">Select Role</div>)
    
        return (
          <div className="roleWrapper">
            <h2>{data.role.id}</h2>
            <div className="requirement"><span>{data.role.requirement}</span> required</div>
            <h3>Members</h3>
            <ul>
              {data.role.members.map(({last_name},idx) => {
                return (<li key={idx}>{last_name}</li>)
              })}
            </ul>
            <h3>Equipments</h3>
            <ul>
              {data.role.equipments.map(({id},idx) => {
                return (<li key={idx}>{id}</li>)
              })}
            </ul>
            <h3>Softwares</h3>
              {data.role.softwares.map(({id},idx) => {
                return (<li key={idx}>{id}</li>)
              })}
            <ul>
            </ul>
          </div>
        );
      }

    return (
        <div id="roles" className="component">
            <aside>
              {AsideItems()}
            </aside>
            <section className="contents">
                {MainContents()}
            </section>
        </div>
    )
}

export default Roles;