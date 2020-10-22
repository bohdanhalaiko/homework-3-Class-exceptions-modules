function WorkerEenterprise(arg) {
  this.depName = arg.depName;
  this.depAbbr = arg.depAbbr;
  this.depManager = arg.depManager;
  this.numWorker = arg.numWorker;
}
function Worker(_,arg) {
  WorkerEenterprise.apply(this, arguments);
  this.lastName = arg.lastName;
  this.firstName = arg.firstName;
  this.patronymic = arg.patronymic;
  this.id = arg.id;
  this.passport = arg.passport;
  this.yearBirth = arg.yearBirth;
  this.placeBirth = arg.placeBirth;
  this.address = arg.address;
  this.startWork = new Date();
  this.position = [];
  
}

Worker.prototype.setPosition = function(position, salary) {
  this.position.push(position);
  this.salary = salary;
  this.salaryPlus = countsalaryPlus(this);
}

function countsalaryPlus(obj) {
  const fullExp = ~~( (new Date() - obj.startWork) / 365 / 24 / 3600 / 1000 );
  return obj.salary * (1 + fullExp * 1.2 / 100) ;
}

const deartamentNOF = new WorkerEenterprise({
  depName: 'Nord office',
  depAbbr: 'NOF',
  depManager: 'John Garger',
  numWorker: 15
});
const worker1 = new Worker(
  deartamentNOF,
  {
    lastName: 'Петренко',
    firstName: 'Петро',
    patronymic: 'Петрович',
    id: 123456,
    passport: 'АБ 123456',
    yearBirth: 2003,
    placeBirth: 'Львів',
    address: 'пл. Ринок 13',
  }
);
console.log(deartamentNOF);
worker1.setPosition('секретар', 5000);
console.log(worker1);
