import React, { useContext } from 'react';
// User 컴포넌트에서 바로 dispatch 를 사용 할건데요, 그렇게 하기 위해서는 
// useContext 라는 Hook 을 사용해서 우리가 만든 UserDispatch Context 를 조회해야한다.
import { UserDispatch } from './App'

function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <User 
        user={user} 
        key={user.id}         
        />
      ))}
    </div>
  );
}
//------------------------------------------------------------------------------
function User({ user }) {    
  const dispatch = useContext(UserDispatch);
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black'
        }}
        onClick={() => {
          dispatch({
            type : 'TOGGLE_USER',
            id: user.id
          });
        }}
      >
        {user.username}
      </b>
      &nbsp; 
      <span>({user.email})</span>
      <button onClick={() => {
        dispatch({
          type: 'REMOVE_USER', id: user.id
        });
      }}>삭제</button>
    </div>
  );
}
// 질문 ------
// onClick={() => onRemove(user.id)} 이 코드는 잘 동작하는데
// onClick={onRemove(user.id)} 이 코드는 왜 동작하지 않는건가요?

// 답변 ---
// onClick={someFunction()} 을 해버리면 해당 콤포넌트가 렌더링이 되는것과 동시에 someFunction함수를 실행시켜버립니다.

// 그래서 보통 onClick={someFunction} 으로 지정해서 () 를 제외하는 방법으로 함수가 즉시실행 되지 않게 하고, 클릭했을때 실행이 되도록 해주죠

// 그런데 예제와 같이 onRemove의 경우, 해당 함수가 실행될 떄 아이디 값도 받아와야 하잖아요.
// 이런 경우에 onClick = { onRemove(user.id) } 를 해버리면, 해당 콤포넌트가 렌더링됨가 동시에 이 함수 실행이 되어버려서 아마 아무것도 렌더링이 되어버리지 않을거에요. 콘솔에서도 오류메시지가 발생할거구요.

// 따라서 이런 문제들을 해결하기 위해 onClick에 콜백 함수를 넣어주고, 해당 함수가 실행될 때 user.id를 건네주어 실행시키는 방법으로 처리를 하는거에요


export default React.memo(UserList);