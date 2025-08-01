import { Subject } from "@/types/subject/subject"
import { 
    CircleStackIcon, 
    ServerIcon, 
    ChartBarIcon,
    LockClosedIcon } from "@heroicons/react/24/outline"

const heroiconClassName = "w-12 h-12 text-black-600"

const subjects: Subject[] = [
  {
    id: "db",
    name: "데이터베이스",
    description: "데이터 저장과 관리 기술을 배우는 과목",
    details: `관계형 데이터베이스 설계<br/>
              SQL 질의 작성<br/>
              트랜잭션 및 동시성 제어
            `,
    difficulty: "쉬움",
    credit: 3,
    recommended: false,
    icon: `<CircleStackIcon className=${heroiconClassName}/>`
  },
  {
    id: "os",
    name: "운영체제",
    description: "컴퓨터 자원 관리와 프로세스 제어를 배우는 과목",
    details: `프로세스 관리<br/>
              메모리 관리<br/>
              파일 시스템 및 I/O 제어
            `,
    difficulty: "",
    credit: 3,
    recommended: true,
    icon: `<ServerIcon className=${heroiconClassName}/>`
  },
  {
    id: "algorithm",
    name: "알고리즘",
    description: "문제 해결을 위한 효율적 알고리즘을 배우는 과목",
    details: `정렬, 탐색<br/>
              그래프 알고리즘<br/>
              동적 계획법
            `,
    difficulty: "어려움",
    credit: 3,
    recommended: true,
    icon: `<ChartBarIcon className=${heroiconClassName}/>`
  },
  {
    id: "cryptography",
    name: "암호학",
    description: "암호학 역사와 다양한 암호학 기술을 배우는 과목 ",
    details: `RSA, DES, AES 등<br/> 
              다양한 암호 알고리즘 학습.
              `,
    difficulty: "쉬움",
    credit: 3,
    recommended: true,
    icon: `<LockClosedIcon className=${heroiconClassName}/>`
  },
  // {
  //   id: "db",
  //   name: "데이터베이스",
  //   description: "",
  //   details: "",
  //   difficulty: "",
  //   credit: 0,
  //   recommended: false,
  //   icon: ""
  // }
]

export default subjects