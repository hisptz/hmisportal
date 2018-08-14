import {vmcc} from './indicators/vmcc';
import {tracer_medicine} from './indicators/tracer_medicine';
import {tb} from './indicators/tb';
import {sti} from './indicators/sti';
import {postnatalCare} from './indicators/postnatalCare';
import {pmtct} from './indicators/pmtct';
import {nutrition} from './indicators/nutrition';
import {noncommunicabledisease} from './indicators/noncommunicabledisease';
import {mortalities} from './indicators/mortalities';
import {newbornCare} from './indicators/newbornCare';
import {malaria} from './indicators/malaria';
import {laborDelivery} from './indicators/laborDelivery';
import {ivd} from './indicators/ivd';
import {gbvVac} from './indicators/gbvVac';
import {hivaids} from './indicators/hivaids';
import {cervicalCancer} from './indicators/cervicalCancer';
import {art} from './indicators/art';
import {antenatalCare} from './indicators/antenatalCare';
import {ancIntegration} from './indicators/ancIntegration';
import {pediatrichiv} from './indicators/pediatrichiv';
import {dashboards} from './indicators/dashboards';

export interface StoreData {
  indicators: any[];
  currentpage: string;
  dashboardPeriod: string;
  currentperiod: any;
  currentperiodtype: any;
  options: any;
  currentorgunit: any;
  orgUnits: any[];
  data: any;
  quarters: any[];
  years: any[];
  icons: any[];
}

export const INITIAL_STORE_DATA: StoreData = {
  indicators: [],
  currentpage: 'dashboard',
  dashboardPeriod: '2018',
  currentperiod: '2018Q2',
  currentperiodtype: 'Year',
  options: null,
  currentorgunit: 'm0frOspS7JY',
  orgUnits: [
    {
      'name': 'MOH Tanzania',
      'id': 'm0frOspS7JY',
      'level': '1'
    },
    {
      'name': 'Arusha Region',
      'id': 'YtVMnut7Foe',
      'level': '2'
    },
    {
      'name': 'Dar Es Salaam Region',
      'id': 'acZHYslyJLt',
      'level': '2'
    },
    {
      'name': 'Dodoma Region',
      'id': 'Cpd5l15XxwA',
      'level': '2'
    },
    {
      'name': 'Geita Region',
      'id': 'MAL4cfZoFhJ',
      'level': '2'
    },
    {
      'name': 'Iringa Region',
      'id': 'sWOWPBvwNY2',
      'level': 'LEVEL-3;'
    },
    {
      'name': 'Kagera Region',
      'id': 'Crkg9BoUo5w',
      'level': '2'
    },
    {
      'name': 'Katavi Region',
      'id': 'DWSo42hunXH',
      'level': '2'
    },
    {
      'name': 'Kigoma Region',
      'id': 'RD96nI1JXVV',
      'level': '2'
    },
    {
      'name': 'Kilimanjaro Region',
      'id': 'lnOyHhoLzre',
      'level': '2'
    },
    {
      'name': 'Lindi Region',
      'id': 'VMgrQWSVIYn',
      'level': '2'
    },
    {
      'name': 'Manyara Region',
      'id': 'qg5ySBw9X5l',
      'level': '2'
    },
    {
      'name': 'Mara Region',
      'id': 'vYT08q7Wo33',
      'level': '2'
    },
    {
      'name': 'Mbeya Region',
      'id': 'A3b5mw8DJYC',
      'level': '2'
    },
    {
      'name': 'Morogoro Region',
      'id': 'Sj50oz9EHvD',
      'level': '2'
    },
    {
      'name': 'Mtwara Region',
      'id': 'bN5q5k5DgLA',
      'level': '2'
    },
    {
      'name': 'Mwanza Region',
      'id': 'hAFRrgDK0fy',
      'level': '2'
    },
    {
      'name': 'Njombe Region',
      'id': 'qarQhOt2OEh',
      'level': '2'
    },
    {
      'name': 'Pwani Region',
      'id': 'yyW17iCz9As',
      'level': '2'
    },
    {
      'name': 'Rukwa Region',
      'id': 'vAtZ8a924Lx',
      'level': '2'
    },
    {
      'name': 'Ruvuma Region',
      'id': 'ZYYX8Q9SGoV',
      'level': '2'
    },
    {
      'name': 'Shinyanga Region',
      'id': 'EO3Ps3ny0Nr',
      'level': '2'
    },
    {
      'name': 'Simiyu Region',
      'id': 'IgTAEKMqKRe',
      'level': '2'
    },
    {
      'name': 'Singida Region',
      'id': 'LGTVRhKSn1V',
      'level': '2'
    },
    {
      'name': 'Songwe Region',
      'id': 'Rg0jCRi9297',
      'level': '2'
    },
    {
      'name': 'Tabora Region',
      'id': 'kZ6RlMnt2bp',
      'level': '2'
    },
    {
      'name': 'Tanga Region',
      'id': 'vU0Qt1A5IDz',
      'level': '2'
    }
  ],
  data: {
    'dashboard': dashboards,
    'ancIntegration': ancIntegration,
    'antenatalCare': antenatalCare,
    'art': art,
    'cervicalCancer': cervicalCancer,
    'gbvVac': gbvVac,
    'hivaids': hivaids,
    'ivd': ivd,
    'laborDelivery': laborDelivery,
    'malaria': malaria,
    'mortalities': mortalities,
    'newbornCare': newbornCare,
    'noncommunicabledisease': noncommunicabledisease,
    'nutrition': nutrition,
    'pediatrichiv': pediatrichiv,
    'pmtct': pmtct,
    'postnatalCare': postnatalCare,
    'sti': sti,
    'tb': tb,
    'tracer_medicine': tracer_medicine,
    'vmcc': vmcc
  },
  quarters: [
    {'id': '2018Q2', 'name': 'Apr - Jun 2018'},
    {'id': '2018Q1', 'name': 'Jan - Mar 2018'},
    {'id': '2017Q4', 'name': 'Oct - Dec 2017'},
    {'id': '2017Q3', 'name': 'Jul - Sep 2017'},
    {'id': '2017Q2', 'name': 'Apr - Jun 2017'},
    {'id': '2017Q1', 'name': 'Jan - Mar 2017'},
    {'id': '2016Q4', 'name': 'Oct - Dec 2016'},
    {'id': '2016Q3', 'name': 'Jul - Sep 2016'},
    {'id': '2016Q2', 'name': 'Apr - Jun 2016'},
    {'id': '2016Q1', 'name': 'Jan - Mar 2016'},
    {'id': '2015Q4', 'name': 'Oct - Dec 2015'},
    {'id': '2015Q3', 'name': 'Jul - Sep 2015'},
    {'id': '2015Q2', 'name': 'Apr - Jun 2015'},
    {'id': '2015Q1', 'name': 'Jan - Mar 2015'},
    {'id': '2014Q4', 'name': 'Oct - Dec 2014'},
    {'id': '2014Q3', 'name': 'Jul - Sep 2014'},
    {'id': '2014Q2', 'name': 'Apr - Jun 2014'},
    {'id': '2014Q1', 'name': 'Jan - Mar 2014'},
  ],
  years: [
    {'name': '2018', 'id': '2018'},
    {'name': '2017', 'id': '2017'},
    {'name': '2016', 'id': '2016'},
    {'name': '2015', 'id': '2015'},
    {'name': '2014', 'id': '2014'},
  ],
  icons: [
    {name: 'table', image: 'table.jpg', action: ''},
    {name: 'column', image: 'bar.png', action: ''},
    {name: 'line', image: 'line.png', action: ''},
    {name: 'combined', image: 'combined.jpg', action: ''},
    {name: 'bar', image: 'column.png', action: ''},
    {name: 'area', image: 'area.jpg', action: ''},
    {name: 'pie', image: 'pie.png', action: ''},
    {name: 'map', image: 'map.jpg', action: ''}
  ]
};
