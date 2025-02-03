import image from "../assets/pastorBawa.png";

const About = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3"
            alt="Mission team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-4">About Us</h1>
            <p className="text-lg leading-snug max-w-3xl mx-auto  break-words italic">
              We are a group of believers from diverse denominations, united by
              a passion for missions. We aim to reach out to people everywhere,
              enabling their salvation, rededication, commitment, and
              discipleship. We achieve this by prayerfully seeking and visiting
              mission fields, and partnering with local churches and agencies.
              We present the Gospel message in accordance with the Bible and
              entrust new converts to the care of local missionaries and pastors
              for follow-up and discipleship.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-1 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-900">Our Story</h2>
            <p className="text-lg text-gray-700">
              All praise and glory be to God Almighty, to whom we belong, for
              granting us the privilege of working alongside Him in reaching out
              to souls. May the fruits of our labor be His alone, forever. Amen.
              We are a group of believers from various denominations, united by
              a passion for missions. Our sole aim is to reach out to souls
              wherever they may be, enabling their salvation, rededication,
              commitment, and discipleship, transforming them into effective
              tools in God's hands. To achieve this, we prayerfully seek and
              visit a mission field each Christmas period. The local mission
              agency or umbrella organization serves as our host. Since 2012, we
              have been privileged to visit several mission fields across
              various states in Nigeria. However, our initial mission efforts,
              born out of a strong passion for soul-winning, began at Kagoro
              Mountains in 2007. Ultimately, we rely on God's provision and
              leverage our individual commitments, as well as the support of
              like-minded individuals, groups, and organizations to fund our
              missions. We present the Gospel message in accordance with the
              Bible and entrust new converts to the care of local missionaries
              and pastors for follow-up and discipleship.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-900">
              Mission and Vision
            </h2>
            <ul className=" text-lg text-gray-700 space-y-4">
              <li>
                <strong>Motto:</strong> Every soul counts.
              </li>
              <li>
                <strong>Mandate:</strong> To reawaken the body of Christ to the
                Great Commission.
              </li>
              <li>
                <strong>Goal:</strong> To preach the Gospel simply, presenting
                Christ crucified for salvation, strengthening believers, and
                enabling disciple-making.
              </li>
              <li>
                <strong>Mission:</strong> To reach all people with the Gospel
                and empower their holistic development.
              </li>
              <li>
                <strong>Approach:</strong> Preaching the Gospel alongside free
                humanitarian services.
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-900">Leadership</h2>
            <div className="flex flex-col lg:flex-row items-start gap-6">
              {/* Leader Image */}
              <div className="flex-shrink-0">
                <img
                  src={image}
                  alt="Pastor Bawa G. Emmanuel"
                  className="w-[300px] lg:w-[400px] h-auto object-cover rounded-lg shadow-md"
                />
                <p className="mt-4 text-center font-bold text-lg">
                  Coordinator/President: Bawa G. Emmanuel
                </p>
              </div>

              {/* Leader Description */}
              <div className=" p-6  text-lg leading-relaxed text-gray-700">
                <p>
                  Bawa G. Emmanuel has an apostolic and evangelistic mandate,
                  serving as a spiritual midwife to bring about the revival that
                  is upon the church by upholding the truth of God's Word and
                  reawakening the body of Christ to the Great Commission –
                  missions.
                </p>
                <p>
                  As President of Reachout To All, a non-denominational
                  ministry, his aim is to reach souls across the nations with
                  the Gospel, accompanied by a humanitarian touch of love.
                </p>
                <p>
                  Academically trained as a microbiologist and environmental
                  scientist, Bawa G. Emmanuel holds a Master's degree in
                  Environmental Management. He is also a radio evangelist and
                  preacher of God's Word, serving the body of Christ across the
                  board.
                </p>
                <p>
                  Bawa G. Emmanuel is married to Funmilola, his lovely wife, and
                  they have two children, Agmada and Shekwolo. The family is
                  based in Kaduna, Nigeria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 space-y-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-">
            What We Believe
          </h2>

          <p className=" text-xl text-center">
            We believe that all people deserve to be reached with the gospel
            alongside humanitarian services for their rounded development.
          </p>

          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
            Call to Action
          </h2>
          {/* Content */}
          <p className="text-xl text-center ">
            You can get involved in reaching out to lives using your
            skills,talents, and resources.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16 space-y-4">
        <h2 className="text-3xl font-bold text-blue-900">Team</h2>
        <div className="  ">
          <table className="table-auto w-full text-left text-gray-700">
            <tbody>
              <tr>
                <td className="font-semibold pr-4">
                  Secretary-Administration:
                </td>
                <td>Japhet Chucks Jonathan</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Secretary-Operations:</td>
                <td>Obed Marcus Minna</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Treasurer:</td>
                <td>Alheri Ali</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Abuja Field Missionary:</td>
                <td>Nathan S. Galadima</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Ondo Field Missionary:</td>
                <td>Victor O. Enenche</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default About;
