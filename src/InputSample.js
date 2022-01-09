import React, { useState, useRef } from 'react';

function InputSample() {
const [inputs, setInputs] = useState({
  name : '',
  nickname: ''
})  
const nameInput = useRef();

const {name, nickname} = inputs //비구조화 할당을 통해 값 추출

const onChange = (e) => {
  console.log(e.target)
  const {name, value} = e.target;
  
  console.log({value, name, nickname})
  console.log(e.target.value);
  console.log(e.target.name);
  
  setInputs({ 
    ...inputs, 
    //... 문법은 spread 문법입니다. 객체의 내용을 모두 "펼쳐서" 기존 객체를 복사해주는데요
    //이러한 작업을, "불변성을 지킨다" 라고 부릅니다. 불변성을 지켜주어야만 리액트 컴포넌트에서 상태가 업데이트가 됐음을 감지 할 수 있고 이에 따라 필요한 리렌더링이 진행됩니다. 만약에 inputs[name] = value 이런식으로 기존 상태를 직접 수정하게 되면, 값을 바꿔도 리렌더링이 되지 않습니다.
    // 추가적으로, 리액트에서는 불변성을 지켜주어야만 컴포넌트 업데이트 성능 최적화를 제대로 할 수 있습니다. 컴포넌트 최적화에 대해서는 나중에 더 자세히 알아보도록 하겠습니다.
    // 지금은 이것만 기억하세요. 리액트에서 객체를 업데이트하게 될 때에는 기존 객체를 직접 수정하면 안되고, 새로운 객체를 만들어서, 새 객체에 변화를 주어야 됩니다.
    [name]: value,
    [nickname]: value
  })
  //input name='name' 에서 'name'은 결국 e.target으로 값을 가져오고 key 로서 사용하기 위해서 사용한 것 이다. 
  //input name = ''에 들어갈 string 값은 key인 것이다.
  //ex) const key = 'test'
  //    const value = 'happy'
  //const box = {
  //[key] : value  
  //}
  //console.log(box);
  //{test: 'happy'}
}
console.log({name});
console.log({nickname});

const onReset = () => {
    setInputs({
      name: '',
      nickname: '',
    })
    nameInput.current.focus();
  };
  return (
    <div>
      <input 
      name='name' 
      placeholder="이름" 
      onChange={onChange} 
      value={name} 
      ref={nameInput}
      />
      <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})     
      </div>
    </div>
  );
}

export default InputSample;