# 숫자 맞히기 게임

해당 게임을 만들기 위한 조건을 프로그래머처럼 사고해보자.

```간단한 숫자 맞히기 게임을 만들어주세요. 무작위로 선택한 1과 100 사이의 수를 플레이어가 10턴 내에 알아내는 게임입니다. 각 턴 후에는 플레이어가 고른 숫자가 맞았는지 아니면 틀렸는지 알려줘야 하고, 만약 틀린 경우에는 플레이어의 숫자가 너무 낮았는지, 아니면 너무 높았는지를 알려줘야 합니다. 플레이어가 이전에 추측한 숫자들의 기록도 보여줘야 합니다. 게임은 플레이어가 숫자를 맞히거나, 턴을 모두 소모하면 끝납니다. 게임이 끝난 뒤에는 다시 게임을 시작할 수 있는 옵션을 제공해야 합니다.```

과제를 간단하고 작은 작업으로 세분화를 시킨다.

1. 1과 100 사이의 무작위 숫자를 생성하기.
2. 플레이어의 현재 턴을 기록하기. 1부터 시작.
3. 플레이어가 정답을 추측할 수 있는 방법을 제공.
4. 플레이어가 자신의 추측 기록을 확인할 수 있도록, 제출하는 수를 기록.
5. 그 후, 제출한 수가 정답인지 확인.
6. 만약 정답이라면
    1. 1과 100 사이의 무작위 숫자를 생성하기.
    2. 이후에 플레이어가 다른 숫자를 제출하면 게임이 망가질 수 있으니 제출을 막기.
    3. 게임을 다시 시작할 수 있는 컨트롤 보여주기
7. 만약 오답이고 아직 플레이어 턴이 남아있다면
    1. 오답임을 알리고 제출한 숫자가 정답보다 높았는지, 낮았는지 보여주기.
    2. 다른 숫자의 제출을 허용.
    3. 턴 숫자를 1 늘리기.
8. 만약 오답인데 플레이어 턴이 남아있지 않다면
    1. 플레이어에게 게임이 끝났음을 알리기
    2. 이후에 플레이어가 다른 숫자를 제출하면 게임이 망가질 수 있으니 제출을 막기.
    3. 게임을 다시 시작할 수 있는 컨트롤 보여주기.

HTML의 ```<script>  </script>```부분을 작성해주면 된다.


### 변수와 상수

```js
let randomNumber = Math.floor(Math.random() * 100) + 1; // 수학 알고리즘을 통해 1부터 100 사이의 무작위 수 할당.

// 아래의 세 개 상수는 HTML의 결과 문단을 가리키는 참조 저장.
const guesses = document.querySelector('.guesses'); 
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

// 추측한 숫자를 제출할 때 사용할 양식 텍스트 입력 칸과 제출 버튼의 참조 저장.
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

// 플레이어가 사용한 턴 수인 1, 초기화 버튼의 참조를 저장.
let guessCount = 1;
let resetButton;
```
프로그램이 사용할 변수와 상수를 설정하는 코드블럭이다. 

변수는 ```let``` 키워드와 그 뒤의 이름으로 생성 가능하다. 

상수는 ```const``` 키워드와 그 뒤의 이름으로 생성 가능하다.

내가 주언어로 사용하는 C#의 경우 변수는 ```자료형 + 변수명```, 상수는 ```const + 자료형 + 상수명```으로 선언을 하였기에 자료형을 사용하지 않는 js가 신기했다!

### 함수
```js
function checkGuess() {
  alert('I am a placeholder');
}
```
함수는 한 번 작성한 후 몇 번이든 재사용할 수 있는 코드 블록이다. 같은 코드를 계속 작성할 필요가 없게 해준다!

위 코드는 ```function``` 키워드 + 이름 + 빈 소괄호와 중괄호로 함수를 정의하는 코드이다.

```js
checkGuess();
```
를 통하여 호출할 수 있으며, 키보드의 Enter키를 누르면 경고(메시지) 창이 나올 것이다. 

![ConsoleImage](C:\Users\sohyung\Documents\JS_StudyNote\Image)

## 조건

```checkGuess()``` 함수로 돌아가서, 우리가 원하는 동작은 플레이어의 추측이 정답인지 아닌지 확인하는 것이다.

내부의 코드를 아래 코드로 교체해준다.
```js
function checkGuess() {
  const userGuess = Number(guessField.value); // 텍스트 필드에 입력된 현재 값 저장, 숫자값으로 만들기 위해 Number 생성자로 감쌌다.
  if (guessCount === 1) {
    guesses.textContent = 'Previous guesses: '; // guessCount가 참이라면 출력
  }
  guesses.textContent += userGuess + ' '; // 플레이어의 입력값이 붙어있지 않도록 출력

  if (userGuess === randomNumber) /*플레이어의 추측이 맞았을 경우*/ {
    lastResult.textContent = 'Congratulations! You got it right!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();
  } else if (guessCount === 10) /*플레이어의 추측이 마지막 턴까지 틀렸을 경우*/ {
    lastResult.textContent = '!!!GAME OVER!!!';
    lowOrHi.textContent = '';
    setGameOver();
  } else /*플레이어의 추측이 틀렸고 마지막 턴이 아닌 경우*/ {
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';
    if(userGuess < randomNumber) /*숫자가 정답보다 작다면*/ {
      lowOrHi.textContent = 'Last guess was too low!';
    } else if(userGuess > randomNumber) /*숫자가 정답보다 크다면*/ {
      lowOrHi.textContent = 'Last guess was too high!';
    }
  }
  // 다음 추측을 받기 위한 준비
  guessCount++;
  guessField.value = '';
  guessField.focus();
}
```
### 이벤트
위 코드는 함수만 구현되어있지 함수를 호출하는 곳이 없다. 

"Submit guess" 버튼을 눌렀을 때 ```checkGuess()```함수를 호출하도록 해야 한다!

이벤트를 통해 이러한 기능을 구현할 수 있는데, 이벤트란 브라우저에서 발생하는 여러 일들이다. (버튼 클릭, 페이지 로딩 등)

이벤트가 발생하면 코드 블록이 그 이벤트에 반응해서 실행하도록 설정하는 것.

이벤트 수신기는 *특정 이벤트의 발생을 감지, 이벤트 처리기를 호출*하며 이벤트 처리기가 바로 이벤트에 반응하는 코드블록이다.

```checkGuess()```함수 아래에 아래 코드를 추가한다.
```js
guessSubmit.addEventListener('click', checkGuess);
```
위 코드는 guessSubmit 버튼에 이벤트 수신기를 추가한다. ```addEventListener()```는 두 개의 인자값을 받는 메서드로, 각각 수신할 이벤트 유형(click)을 가리키는 문자열과, 이벤트가 발생하면 실행할 코드(checkGuess)이다. 

이벤트 리스너에 함수를 인자값으로 줄 때에는 괄호를 붙이지 않는다!!

위 코드까지 추가한다면 어느 정도는 제대로 작동을 하지만, 올바른 숫자를 입력하거나 모든 턴을 써버리면 오류가 발생한다. 

게임이 끝났을 때의 코드를 추가하고 마무리를 해보자.

### 게임 기능 마무리
```js
function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  document.body.append(resetButton);
  resetButton.addEventListener('click', resetGame);
}
```
- 첫 두 줄은 텍스트 입력 칸과 제출 버튼의 disable 속성을 true로 설정해 비활성화 시킨다.
- 그 뒤 세 줄은 ```<button>```요소를 생성하고 Start new game이라는 새로운 버튼을 HTML 아래에 추가한다.
- 마지막 줄은 새로 추가한 버튼에 이벤트 수신기를 붙여, 해당 버튼을 누르면 ```resetGame()```이 호출되도록 한다.

```js
function resetGame() {
  guessCount = 1; // guessCount를 다시 1로 낮춘다.

  // 모든 정보 텍스트 문단의 내용을 삭제한다.
  const resetParas = document.querySelectorAll('.resultParas p'); 
  for (const resetPara of resetParas) {
    resetPara.textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);

  // 비활성화했던 버튼들을 다시 활성화 시킨다.
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  // lastResult 문단의 배경 색을 제거한다.
  lastResult.style.backgroundColor = 'white';

  // 새 게임을 시작하게 하는 무작위 숫자를 새로 선택한다.
  randomNumber = Math.floor(Math.random() * 100) + 1;
}
```

