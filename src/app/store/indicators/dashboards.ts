/**
 * Created by kelvin on 9/8/17.
 */
export const dashboards = [
  {
    url: 'analytics.json?dimension=dx:ykShMtNgDB1&',
    data: [
      {'name': 'TOTAL POPULATION', 'uid': 'ykShMtNgDB1'}
    ],
    'title': 'TOTAL POPULATION',
    'description': 'TOTAL POPULATION',
    'chart': 'column',
    'higher_level': false,
    'yAxisType': 'dx',
  },
  {
    url: 'analytics.json?dimension=dx:ykShMtNgDB1&dimension=Cow9nZikDgD:LBipXEMD6mq;FfN1mqXvpR7;aZcKJ9XxvaF;HKU7NijIEIH;h8JRv8POdfy&',
    data: [
      {'name': '< 1', 'uid': 'h8JRv8POdfy'},
      {'name': '1 - 4', 'uid': 'LBipXEMD6mq'},
      {'name': '5 - 14', 'uid': 'aZcKJ9XxvaF'},
      {'name': '15 - 49', 'uid': 'FfN1mqXvpR7'},
      {'name': '50 - 60', 'uid': 'HKU7NijIEIH'}
    ],
    'identifiers': 'ykShMtNgDB1',
    'title': 'POPULATION BY AGE',
    'description': 'TOTAL POPULATION BY AGE',
    'chart': 'column',
    'yAxisType': 'Cow9nZikDgD',
    'higher_level': false
  },
  {
    url: 'analytics.json?dimension=dx:ykShMtNgDB1&dimension=hENn80Fmmlf:mtUMlCLFTTz;syxWmui9UMq&',
    data: [
      {'name': 'Male', 'uid': 'mtUMlCLFTTz'},
      {'name': 'Female', 'uid': 'syxWmui9UMq'}
    ],
    'identifiers': 'ykShMtNgDB1',
    'title': 'POPULATION BY GENDER',
    'description': 'TOTAL POPULATION BY GENDER',
    'chart': 'column',
    'higher_level': false,
    'yAxisType': 'hENn80Fmmlf',
  },
  {
    url: 'analytics.json?dimension=dx:nG4jLoeBLAN;UxnVJil2BwF;NOk7PCAF174;fdX6lREQQp0;lJNzLghsdKg;BwXD0MzkvLG;oRbPiu3t4oc&',
    data: [
      {'name': 'Clinical Officer', 'uid': 'nG4jLoeBLAN'},
      {'name': 'Clinical Assistant', 'uid': 'UxnVJil2BwF'},
      {'name': 'Medical Attendant', 'uid': 'NOk7PCAF174'},
      {'name': 'Medical Officer', 'uid': 'fdX6lREQQp0'},
      {'name': 'Nurse', 'uid': 'lJNzLghsdKg'},
      {'name': 'Nursing Officer', 'uid': 'BwXD0MzkvLG'},
      {'name': 'Pharmasict', 'uid': 'oRbPiu3t4oc'}
    ],
    'title': 'Health Workers by cadre',
    'description': 'Health Workers by cadre',
    'chart': 'column',
    'higher_level': false,
    'yAxisType': 'dx',
  },
  {
    url: 'analytics.json?dimension=dx:GzvLb3XVZbR;TfoI3vTGv1f;cap79mdf6Co;rm3y3VHPiFD;QntdhuQfgvT;zeEp4Xu2GOm&',
    data: [
      {'name': 'HMIS_Kutoka Wodi ya Wazazi (L&D)', 'uid': 'GzvLb3XVZbR'},
      {'name': 'HMIS_Uzazi wa Mpango (FP)', 'uid': 'TfoI3vTGv1f'},
      {'name': 'HMIS_Ufuatiliaji wa Watoto (Child Health)', 'uid': 'cap79mdf6Co'},
      {'name': 'HMIS_Huduma Baada ya Kujifungua (Postnatal)', 'uid': 'rm3y3VHPiFD'},
      {'name': 'HMIS_Magonjwa ya Kuhara (DTC)', 'uid': 'QntdhuQfgvT'},
      {'name': 'HMIS_Kliniki ya Wajawazito (ANC)', 'uid': 'zeEp4Xu2GOm'}
    ],
    'title': 'RCH DATA COMPLETENESS',
    'description': 'RCH DATA COMPLETENESS',
    'chart': 'column',
    'higher_level': false,
    'yAxisType': 'dx',
  },
  {
    url: 'analytics.json?dimension=dx:ZOvFj2vtlor;qpcwPcj8D6u;v6wdME3ouXu&',
    data: [
      {'name': 'Tracer Medicine', 'uid': 'ZOvFj2vtlor'},
      {'name': 'Wagonjwa wa Kulazwa (IPD)', 'uid': 'qpcwPcj8D6u'},
      {'name': 'Wagonjwa wa Nje (OPD)', 'uid': 'v6wdME3ouXu'}
    ],
    'title': 'HMIS DATA COMPLETENESS',
    'description': 'HMIS DATA COMPLETENESS',
    'chart': 'column',
    'higher_level': false,
    'yAxisType': 'dx',
  },
  {
    url: 'analytics.json?dimension=dx:Hwcn7ajwZ1p;Dp0VF7ssmcH;CxaDPrjhmax;db4lfMnttc6&',
    data: [
      {'name': 'HIV Care and Treatment Reporting Form', 'uid': 'Hwcn7ajwZ1p'},
      {'name': 'HIV Testing and Counselling (HTC)', 'uid': 'Dp0VF7ssmcH'},
      {'name': 'Home Based Care ( HUWANYU)', 'uid': 'CxaDPrjhmax'},
      {'name': 'Sexually Transmitted Infections (STI)', 'uid': 'db4lfMnttc6'}
    ],
    'title': 'NACP DATA COMPLETENESS',
    'description': 'HMIS DATA COMPLETENESS',
    'chart': 'column',
    'higher_level': false,
    'yAxisType': 'dx',
  },
  {
    url: 'analytics.json?dimension=dx:UHDfKY2mUOQ;ykDbDeDvTcx;O2V8r4UT8kB;IzUZXETYoyB&',
    data: [
      {'name': 'HIV Care and Treatment Reporting Form', 'uid': 'UHDfKY2mUOQ'},
      {'name': 'HIV Testing and Counselling (HTC)', 'uid': 'ykDbDeDvTcx'},
      {'name': 'Home Based Care ( HUWANYU)', 'uid': 'O2V8r4UT8kB'},
      {'name': 'Tuberculosis and TB/HIV', 'uid': 'IzUZXETYoyB'}
    ],
    'title': 'NTLP DATA COMPLETENESS',
    'description': 'HMIS DATA COMPLETENESS',
    'chart': 'column',
    'higher_level': false,
    'yAxisType': 'dx',
  }
];
