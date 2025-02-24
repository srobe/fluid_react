import GraphCard from "../components/GraphCard";
import GraphImg from "../assets/graph.png";
import BackgroundImg from "../assets/hero-background.png";

const Home = () => {
  const graphData = [
    {
      image: GraphImg,
      title: 'Weather Forecasts',
      description: 'The Goddard Earth Observing System model is designed to study various Earth Science questions.',
      items: [
        { name: 'Datagrams', link: '/weather-forecasts/datagrams' },
        { name: 'Weather Maps', link: '/weather-forecasts/weather-maps' },
        { name: 'Observing System Statistics', link: '/weather-forecasts/observing-system-statistics' },
        { name: 'Radiance Monitoring', link: '/weather-forecasts/radiance-monitoring' },
        { name: 'Observation Impacts', link: '/weather-forecasts/observation-impacts' },
      ],
      link: '/weather-forecasts'
    },
    {
      image: GraphImg,
      title: 'Aerosol & Gas Forecasts',
      description: 'The Goddard Earth Observing System model is designed to study various Earth Science questions.',
      items: [
        { name: 'Forward Processing (FP)', link: '/aerosol-gas/datagrams' },
        { name: 'Composition Forecast (CF)', link: '/aerosol-gas/spatial-maps' },
      ],
      link: '/aerosol-gas'
    },
    {
      image: GraphImg,
      title: 'Seasonal Prediction',
      description: 'The Goddard Earth Observing System model is designed to study various Earth Science questions.',
      items: [
        { name: 'Datagrams', link: '/seasonal-prediction/datagrams' },
        { name: 'Surface Concentrations', link: '/seasonal-prediction/surface-concentrations' },
        { name: 'Total Columns', link: '/seasonal-prediction/total-columns' },
      ],
      link: '/seasonal-prediction'
    },
    {
      image: GraphImg,
      title: 'Reanalysis',
      description: 'The Goddard Earth Observing System model is designed to study various Earth Science questions.',
      items: [
        { name: 'Anomalies', link: '/reanalysis/anomalies' },
        { name: 'Chem Maps', link: '/reanalysis/chem-maps' },
        { name: 'Climate Statistics', link: '/reanalysis/climate-statistics' },
        { name: 'Weather Maps', link: '/reanalysis/weather-maps' },
      ],
      link: '/reanalysis'
    },
    {
      image: GraphImg,
      title: 'Mission Support',
      description: 'The Goddard Earth Observing System model is designed to study various Earth Science questions.',
      items: [
        { name: 'ARCSIX', link: '/mission-support/arcsix' },
        { name: 'BLUEFLUX', link: '/mission-support/blueflux' },
        { name: 'PACE-PAX', link: '/mission-support/pace-pax' },
        { name: 'SARP', link: '/mission-support/sarp' },
        { name: 'SARP-EAST', link: '/mission-support/sarp-east' },
        { name: 'SARP-WEST', link: '/mission-support/sarp-west' },
        { name: 'SCOAPE-II', link: '/mission-support/scoape-ii' },
      ],
      link: '/mission-support'
    },
  ];

  const backgroundImage = BackgroundImg;

  return (
    <div className="flex flex-col w-screen h-fit">

      {/* HERO SECTION */}
      <div
        className="relative flex-shrink-0 w-full h-50 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 container mx-auto p-5 ml-5 py-32">
          <h1 className="text-white text-4xl font-semibold mb-8">What is FLUID?</h1>
          <p className="text-white text-base md:text-lg mb-16 max-w-3xl">
            The Global Modeling and Assimilation Office (GMAO) Framework for Live User-Invoked Data (FLUID) is a powerful tool designed to make it easier to analyze and visualize climate data. FLUID offers interactive applications that support the GMAO mission by providing quick and intuitive access to experimental and climatological data.
          </p>
          <div className="flex space-x-4">
            <a href="/about" className="bg-blue-600 text-white px-5 py-1 rounded-sm text-base font-normal hover:bg-blue-500">Learn more</a>
            <a href="#" className="text-white px-5 py-1 rounded-sm text-base font-normal border border-white hover:bg-white hover:text-black">How to use FLUID →</a>
          </div>
        </div>
      </div>
      {/* END HERO SECTION */}

      {/* AVAILABLE GRAPHS SECTION */}
      <div className=" flex flex-col justify-center items-center w-full p-7">

        <div className='flex flex-col w-full pl-7'>
          <h2 className="text-2xl font-bold mb-4">Available Graphs</h2>
          <p className="text-lg mb-8 max-w-3xl">
            The Goddard Earth Observing System (GEOS) model is designed to study various Earth Science questions by connecting different model components flexibly.
          </p>
          <p className="border-b border-gray-200"></p>

        </div>

        <div className="flex flex-wrap">
          {graphData.map((graph, index) => (
            <GraphCard
              key={index}
              image={graph.image}
              title={graph.title}
              description={graph.description}
              items={graph.items}
              link={graph.link}
            />
          ))}
        </div>
      </div>
      {/* END AVAILABLE GRAPHS SECTION */}
    </div>
  );
};

export default Home;
