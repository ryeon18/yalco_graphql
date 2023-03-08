import { useQuery} from '@apollo/client';


export function AsideItemsContent ({mainComp, data, loading, error, setContentId, contentId}) {
  
  const roleIcons = {
    developer: '💻',
    designer: '🎨',
    planner: '📝'
  }
 
    function peopleFaces(sex, id) {
      const bySex = {
        male: ['🧑🏿', '👨🏻', '👦🏼', '‍🧓🏽', '🧔🏾'],
        female: ['👩🏻', '👧🏼', '👩🏽‍🦰', '👩🏾‍🦱', '👱🏿‍♀️']
      }
      return bySex[sex][id % bySex[sex].length]
    }

  
    if (loading) return <p className="loading">Loading...</p>
    if (error) return <p className="error">Error :(</p>

  if(mainComp ==='People') {
    return  (
      <ul>
          {data.people.map(
            ({id, sex, first_name, last_name, blood_type},idx) => {
              return (
                <li key={idx} onClick={() => {setContentId(id)}}>
                  <span className="face">{peopleFaces(sex, id)}</span>
                  <span className="bloodType">{blood_type}</span>
                  <span className="peopleName">{first_name} {last_name}</span>
                </li>
              )
          })}
        </ul>
    )
  } else if (mainComp === 'Roles'){
    return (
      <ul>
          {data.roles.map(({id}) => {
          return (
              <li key={id} className={'roleItem ' +  (contentId === 'id' ? 'on' : '')}
              onClick={() => {setContentId(id)}}>
              <span>{contentId === id ? '🔲' : '⬛'}</span>
              {roleIcons[id]} {id}
              </li>
          )
          })}
      </ul>
  );
  } else if (mainComp === 'Teams'){
    return (
      <ul>
            {data.teams.map(({id, manager, members},idx) => {
            return (
                <li key={idx}>
                <span className="teamItemTitle" onClick={() => {setContentId(id)}}>
                    Team {id} : {manager}'s
                </span>
                <ul className="teamMembers">
                    {members.map(({id, first_name, last_name, role}) => {
                    return (
                        <li key={id}>
                        {roleIcons[role]} {first_name} {last_name}
                        </li>
                    )
                    })}
                </ul>
                </li>
            )
            })}
        </ul>
    )
  }
}