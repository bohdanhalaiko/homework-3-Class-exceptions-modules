const students = [];

function Student(arg) {
  this.lastName = arg.lastName;
  this.firstName = arg.firstName;
  this.patronymic = arg.patronymic;
  this.ticketNumber = arg.ticketNumber;
  this.yearBirth = arg.yearBirth;
  this.placeBirth = arg.placeBirth;
  this.address = arg.address;
  this.maritalStatus = arg.maritalStatus;
  this.hobby = arg.hobby;
  this.scholarship = 0;
  this.dormitoryRoom = dormitoryRoomClarify();
  this.monitor = false;
  this.numGroup = arg.study.numGroup;
  this.book = [];
  this.disciplines = arg.study.disciplines.map(el => Object.assign({}, el));
}

Student.prototype.nameFull = function() { // прізвище + і'мя (староста)
  const monitor = this.monitor ? ` (Староста гр.${this.numGroup})` : '';
  return `${this.lastName} ${this.firstName}${monitor}`;
}

Student.prototype.library = function(newBook) { // позика книг в бібліотеці
  // if(this.book.some(el => el.id === newBook.id)) return console.log('У вас вже є ця книга');
  const checkBook = students.some(student => student.book.some(el => el.id === newBook.id));
  if(checkBook) return console.log('Цю книгу вже позичили');
  const costAllBook = this.book.reduce( (acc,el) => acc + +el.price, 0);
  if(costAllBook + +newBook.price <= 100) {
    newBook.date = new Date();
    this.book.push(newBook);
  } else {
    console.log('У вас забагато книг');
  }
};

Student.prototype.ratingAll = function() { // загальний рейтинг
  return this.disciplines.reduce( (acc,el) => acc + +el.rating, 0) / this.disciplines.length;
}

Student.prototype.setRating = function(...arg) { // призначити оцінки
  arg.forEach(setDisc => {
    const set = this.disciplines.findIndex(disc => disc.name === setDisc.name);
    if(set + 1) this.disciplines[set].rating += setDisc.rating;
  });
}

Student.prototype.setMonitor = function() { // призначити старосту
  students.filter(student => student.numGroup === this.numGroup)
          .forEach(student => student.monitor = false);
  this.monitor = true;
  console.log(`Новий староста групи ${this.numGroup}: ${this.nameFull()}`);
}

function dormitoryRoomClarify() { // призначення номеру кімнати в гуртожитку
  let dormitoryRoom = 0;
  let studentRoom = true;
  while(studentRoom){
    dormitoryRoom++;
    studentRoom = students.filter(el => el.dormitoryRoom === dormitoryRoom).length >= 2;
  }
  return dormitoryRoom;
};

function listStudentsForGroup(students){ // список по групах
  const group = [...new Set( students.map(el => el.numGroup) )];
  group.forEach(el => {
    let studentGroup = students
      .filter(student => student.numGroup === el)
      .map(student => student.nameFull())
      .join('\n')
    console.log(`----------------------------------`);
    console.log(`Група ${el}:\n${studentGroup}`);
    console.log(`----------------------------------`);
  });
}

function getRating(students, min, max) { // список від min до max рейтингу
  const rating = students.filter(student => {
    const ratingAll = student.ratingAll();
    return ratingAll >= min && ratingAll <= max;
  });
  console.log(`----------------------------------`);
  console.log(`Рейтинг від ${min} до ${max}:`);
  console.log(rating.map(student => student.nameFull()).join('\n') || 'немає студентів');
  console.log(`----------------------------------`);
}

function setScholarship(numStudents, minRating, size) { // призначеня стипендії
  students.forEach(student => student.scholarship === 0);
  const minRatingStud = students.filter(student => student.ratingAll() >= minRating);
  minRatingStud.sort( (a,b) => b.ratingAll() - a.ratingAll());
  const numStud = minRatingStud.slice(0, numStudents);
  const numStudAndMax = numStud.map(student => {
    student.scholarship = (student.ratingAll() >= 100 ? size * 1.2 : size);
    return student.nameFull() + ': ' + student.scholarship;
  });
  console.log(`----------------------------------`);
  console.log(`Стипендію отримує(ють):`);
  console.log(numStudAndMax.join('\n') || 'немає студентів');
  console.log(`----------------------------------`);
}

function listStudentsWithBooks(allBook) { // перевірка книг
  const yearPlus = allBook ? 0 : 1;
  const timeNow = new Date();
  timeNow.setFullYear(timeNow.getFullYear() - yearPlus);
  const filterStudents = students.filter(student => {
    const filterBook = student.book.filter(book => {
      return timeNow >= book.date;
    });
    return filterBook.length;
  });
  const printRes = filterStudents.map(student => {
    const title = `${student.nameFull()}:\n  книги(а): `;
    const listBook = student.book.map(book => 'id: ' + book.id).join(', ');
    const costAllBook = student.book.reduce( (acc,el) => acc + +el.price, 0);
    return title + listBook + ', борг: ' + costAllBook;
  });

  console.log(`----------------------------------`);
  console.log(`Список студентів та їхніх книг:`);

  console.log(printRes.join('\n') || 'немає студентів');
  console.log(`----------------------------------`);
}

const stadyGroup1 = {
  numGroup: 1,
  disciplines: [
    {
      name: 'математика',
      teacher: 'Василева',
      rating: 0
    },
    {
      name: 'історія',
      teacher: 'Остапова',
      rating: 0
    }
  ]
}
const stadyGroup2 = {
  numGroup: 2,
  disciplines: [
    {
      name: 'право',
      teacher: 'Герасимова',
      rating: 0
    },
    {
      name: 'історія',
      teacher: 'Остапова',
      rating: 0
    }
  ]
};

const student1 = new Student(
  {
    lastName: 'Іваненко',
    firstName: 'Іван',
    patronymic: 'Іванович',
    ticketNumber: 123456,
    yearBirth: 2003,
    placeBirth: 'Львів',
    address: 'пл. Ринок 23',
    maritalStatus: 'неодружений',
    hobby: 'бейсбол',
    study: stadyGroup1
  }
);
students.push(student1);

const student2 = new Student(
  {
    lastName: 'Петренко',
    firstName: 'Петро',
    patronymic: 'Петрович',
    ticketNumber: 123458,
    yearBirth: 2003,
    placeBirth: 'Львів',
    address: 'пл. Ринок 13',
    maritalStatus: 'неодружений',
    hobby: 'футбол',
    study: stadyGroup1
  }
);
students.push(student2);

const student3 = new Student(
  {
    lastName: 'Павленко',
    firstName: 'Павло',
    patronymic: 'Павлович',
    ticketNumber: 123460,
    yearBirth: 2003,
    placeBirth: 'Львів',
    address: 'пл. Ринок 3',
    maritalStatus: 'неодружений',
    hobby: 'футбол',
    study: stadyGroup2
  }
);
students.push(student3);

student1.library({
  id: 20236,
  name: 'Кобзар',
  author: 'Шевченко',
  genre: 'поезія',
  price: 15
});
student1.library({
  id: 20236,
  name: 'Кобзар',
  author: 'Шевченко',
  genre: 'поезія',
  price: 15
});
student2.library({
  id: 20237,
  name: 'Перехресні стежки',
  author: 'Франко',
  genre: 'поезія',
  price: 10
});
student1.setMonitor(); // призначили старосту
student1.setRating( // оцінки першому студенту
  {
    name: 'математика',
    rating: 100
  },
  {
    name: 'історія',
    rating: 100
  },
  {
    name: 'право',
    rating: 100
  }
);
student2.setRating( // оцінки другому студенту
  {
    name: 'математика',
    rating: 75
  },
  {
    name: 'історія',
    rating: 90
  },
  {
    name: 'право',
    rating: 85
  }
);
student3.setRating( // оцінки третьому студенту
  {
    name: 'математика',
    rating: 75
  },
  {
    name: 'історія',
    rating: 70
  },
  {
    name: 'право',
    rating: 70
  }
);
listStudentsForGroup(students); // студенти по групах
getRating(students, 70, 100); // перегляд рейтингу
setScholarship(2, 50, 5000); // призначення стипендії
setScholarship(2, 100, 5000); // призначення стипендії знову
listStudentsWithBooks(); // список книг студентів протермінованих рік
listStudentsWithBooks(true); // список всіх книг студентів
// students.forEach( el => console.log(el) );
