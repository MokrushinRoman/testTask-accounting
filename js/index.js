import { salaries1, salaries2, team1, team2 } from './fakeDb.js';

const calculateTeamFinanceReport = (salaries, team) => {
  const minSpespecializationQuantity = 1;
  const maxSpespecializationQuantity = 10;
  const spespecializationQuantity = Object.keys(salaries).length;
  if (
    spespecializationQuantity < minSpespecializationQuantity ||
    spespecializationQuantity > maxSpespecializationQuantity
  ) {
    console.error(
      `The number of specializations should be in the range from ${minSpespecializationQuantity} to ${maxSpespecializationQuantity} items! Please fix it and try again!`
    );
    return;
  }

  const minTeamQuantity = 1;
  const maxTeamQuantity = 100;
  const teamQuantity = team.length;
  if (teamQuantity < minTeamQuantity || teamQuantity > maxTeamQuantity) {
    console.error(
      `The number of team members should be in the range from ${minTeamQuantity} to ${maxTeamQuantity} persons! Please fix it and try again!`
    );
    return;
  }

  const minSalary = 100;
  const maxSalary = 100000;

  const minTax = 0;
  const maxTax = 99;

  const optimisedSalariesFunc = () => {
    const obj = {};
    const keys = Object.entries(salaries);

    keys.map(item => {
      const optimisedSalaryName = item[0].toLocaleLowerCase().trim();
      obj[optimisedSalaryName] = item[1];
    });
    return obj;
  };
  const optimisedSalaries = optimisedSalariesFunc();

  const report = {};

  team.map(({ name, specialization }) => {
    const optimisedSpecialization = specialization.toLocaleLowerCase().trim();
    const positionSalaryInfo = optimisedSalaries[optimisedSpecialization];
    const capitalSpecialization =
      specialization[0].toUpperCase() + specialization.substring(1);

    if (positionSalaryInfo) {
      const reportItem = `totalBudget${[capitalSpecialization]}`.trim();
      const taxAmount = Math.floor(
        Number(positionSalaryInfo.tax.slice(0, -1))
      ); /* makes rounded tax */
      const netSalary = Math.floor(
        positionSalaryInfo.salary
      ); /* makes rounded salary */
      const dirtySalary = netSalary / ((100 - taxAmount) / 100);
      const flooredDirtySalary = Math.floor(dirtySalary);
      const roundedDirtySalary = Math.round(dirtySalary);

      if (netSalary < minSalary || netSalary > maxSalary) {
        console.error(
          `${capitalSpecialization} position has invalid value of salary! It must be between ${minSalary} and ${maxSalary}! Please fix it and try again!`
        );
        return;
      }

      if (taxAmount < minTax || taxAmount > maxTax) {
        console.error(
          `${capitalSpecialization} position has invalid value of tax! It must be between ${minTax} and ${maxTax}! Please fix it and try again!`
        );
        return;
      }

      if (report[reportItem]) {
        report[reportItem] += flooredDirtySalary;
      }
      if (!report[reportItem]) {
        report[reportItem] = flooredDirtySalary;
      }

      if (report.totalBudgetTeam) {
        report.totalBudgetTeam += roundedDirtySalary;
      }
      if (!report.totalBudgetTeam) {
        report.totalBudgetTeam = roundedDirtySalary;
      }
    } else {
      console.error(
        `${name} has invalid position: ${capitalSpecialization}! Please fix it and try again`
      );
      return;
    }
  });

  console.log(report);
  return report;
};

// calculateTeamFinanceReport(salaries1, team1);
calculateTeamFinanceReport(salaries2,team2)