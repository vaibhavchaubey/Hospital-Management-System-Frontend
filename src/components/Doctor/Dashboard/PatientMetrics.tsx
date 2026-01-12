import { AreaChart } from '@mantine/charts';

const PatientMetrics = () => {
  const data = [
    { date: 'January', patients: 10 },
    { date: 'February', patients: 15 },
    { date: 'March', patients: 12 },
    { date: 'April', patients: 10 },
    { date: 'May', patients: 20 },
    { date: 'June', patients: 9 },
    { date: 'July', patients: 22 },
    { date: 'August', patients: 14 },
    { date: 'September', patients: 18 },
    { date: 'October', patients: 16 },
    { date: 'November', patients: 12 },
    { date: 'December', patients: 10 },
  ];

  const getSum = (data: any[], key: string) => {
    return data.reduce((sum, item) => sum + item[key], 0);
  };

  return (
    <div className="bg-orange-50 rounded-xl border ">
      <div className="flex justify-between items-center p-5">
        <div>
          <div className="font-semibold">Patients</div>
          <div className="text-xs text-gray-500">
            {new Date().getFullYear()}
          </div>
        </div>
        <div className="text-2xl font-bold text-orange-500">
          {getSum(data, 'patients')}
        </div>
      </div>

      <AreaChart
        h={280}
        data={data}
        dataKey="date"
        series={[{ name: 'patients', color: 'orange' }]}
        strokeWidth={5}
        withGradient
        fillOpacity={0.7}
        curveType="bump"
        tickLine="none"
        gridAxis="none"
        withXAxis={false}
        withYAxis={false}
        withDots={false}
      />
    </div>
  );
};

export default PatientMetrics;
