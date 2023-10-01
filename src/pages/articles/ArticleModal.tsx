import { Fragment, useEffect, useState } from "react";
import { fetchArticleById } from "../../context/articles/action";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
type Team = {
  id: number;
  name: string;
  plays: string;
};
type Article = {
  id: 21;
  title: "Upset Victory as Underdog Team Defeats League Leaders";
  summary: "In a stunning upset, an underdog team overcomes the odds to defeat the league leaders, sending shockwaves through the footballing world.";
  thumbnail: "https://images.pexels.com/photos/61143/pexels-photo-61143.jpeg?auto=compress&cs=tinysrgb&w=1440";
  sport: {
    id: 2;
    name: "American Football";
  };
  date: "2023-08-01T12:07:01.967Z";
  content: "In a match that defied all expectations, an underdog team delivered a remarkable upset by defeating the league leaders in a thrilling encounter. The match showcased the unpredictable nature of football, as the underdog team displayed immense determination, tactical brilliance, and clinical finishing. The victory has sent shockwaves through the footballing world, highlighting the magic and unpredictability that makes the sport so captivating.\n\nThe underdog's triumph serves as a reminder that in football, anything is possible. It demonstrates the importance of teamwork, belief, and seizing opportunities when they arise. The victory not only boosts the underdog's confidence but also adds a new dimension to the league, injecting excitement and uncertainty into the title race.\n\nThe footballing world is buzzing with discussions and analysis of this surprising result. Fans and pundits are marveling at the underdog's resilience, as well as questioning the league leaders' performance on the day. This thrilling upset will forever be etched in the memories of both the underdog's fans and football enthusiasts worldwide.";
  teams: Team[];
};
const formattedDate = (date: string) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;
  return new Date(date).toLocaleDateString("en-US", options);
};

const ArticleModal = () => {
  const navigate = useNavigate();
  const { articleId } = useParams();

  const [isOpen, setIsOpen] = useState(true);
  const [article, setArticle] = useState<Article>();
  useEffect(() => {
    handleModalOpen(articleId ? articleId : "27");
  }, [articleId]);
  const closeModal = () => {
    setIsOpen(false);
    navigate("../../", { replace: true });
  };

  const handleModalOpen = async (id: string) => {
    const response = await fetchArticleById(id);
    if (response.ok) setArticle(response.data);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all">
                  {!article ? (
                    <p className="text-2xl text-center">
                      Hang On! We are Loading your content...
                    </p>
                  ) : (
                    <>
                      <Dialog.Title
                        as="h3"
                        className="text-2xl mb-4 font-semibold leading-6"
                      >
                        {article?.title}
                      </Dialog.Title>

                      <div className="mt-2">
                        <img
                          className="w-full h-[250px] object-cover rounded-lg"
                          src={article?.thumbnail}
                          alt="thumbnail-image"
                        />
                      </div>
                      <section>
                        <div className="mt-2 text-center">
                          <i>
                            {article.teams[0]?.name} VS {article.teams[1]?.name}
                          </i>
                        </div>
                        <div className="mt-2">
                          <i className="text-sm  text-gray-600">
                            {formattedDate(article ? article.date : "")}
                          </i>
                        </div>
                        <hr />
                        <div className="mt-4 h-[300px] overflow-y-auto">
                          <p className="text-xl font-normal ">
                            {article?.content}
                          </p>
                        </div>
                      </section>

                      <div className="mt-3 text-right">
                        <button
                          type="button"
                          className="bg-gray-200 px-2 py-1 text-lg font-semibold hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Close
                        </button>
                      </div>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default ArticleModal;
