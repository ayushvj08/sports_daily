import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import {
  fetchSports,
  fetchTeams,
  updatePreferences,
} from "../../context/preferences/action";
import { PreferencesContext } from "../../context/preferences/context";
type Sport = {
  id: number;
  name: string;
};
type Team = {
  id: number;
  name: string;
  plays: string;
};

export type formState = {
  preferences: { sports: number[]; teams: number[] };
};
const PreferencesForm = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const { preferencesState, preferencesDispatch } =
    useContext(PreferencesContext);
  const handleInputChange = (
    type: "UPDATE_SPORT_PREFERENCES" | "UPDATE_TEAM_PREFERENCES",
    id: number
  ) => preferencesDispatch({ type, payload: { id } });
  // const handleSportsChange = (checked: boolean, id: number) => {
  //   preferencesDispatch({
  //     type: "UPDATE_SPORT_PREFERENCES",
  //     payload: { id: id },
  //   });
  // if (checked)
  // setState({
  //   preferences: {
  //     sports: [...state.preferences.sports, id],
  //     teams: [...state.preferences.teams],
  //   },
  // });
  // else

  // setState({
  //   ...state,
  //   preferences: {
  //     sports: state.preferences.sports.filter((e) => e !== id),
  //     teams: [...state.preferences.teams],
  //   },
  // });
  // };
  // const handleTeamsChange = (checked: boolean, id: number) => {
  //   preferencesDispatch({
  //     type: "UPDATE_TEAM_PREFERENCES",
  //     payload: { id: id },
  //   });
  // };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const response = await updatePreferences(
      preferencesDispatch,
      preferencesState
    );
    if (response.ok) closeModal();
  };
  const closeModal = () => {
    setIsOpen(false);
    navigate("../../");
  };
  const [availableSports, setSports] = useState<Sport[]>();
  const [availableTeams, setTeams] = useState<Team[]>();
  useEffect(() => {
    getFormFields();
  }, []);
  const getFormFields = async () => {
    let response = await fetchSports();
    if (response.ok) setSports(response.data.sports);
    response = await fetchTeams();
    if (response.ok) setTeams(response.data);
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
                <Dialog.Panel className="w-full max-w-3xl  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl text-center mb-4 font-semibold leading-6"
                  >
                    My Preferences
                  </Dialog.Title>
                  <section>
                    <hr />
                    {/* <div className="mt-4 h-[300px] overflow-y-auto"> */}
                    {/* {article?.content} */}
                    <p className="text-xl font-semibold my-2">Sports</p>
                    <form onSubmit={handleSubmit}>
                      <div className="flex flex-wrap gap-6 items-center mb-2">
                        {preferencesState.isLoading ? (
                          <div>Loading...</div>
                        ) : (
                          availableSports?.map((sport) => {
                            return (
                              <div key={sport.id}>
                                <input
                                  id={`${sport.id}-${sport.name}`}
                                  name={sport.name}
                                  checked={preferencesState.preferences.sports.includes(
                                    sport.id
                                  )}
                                  // {...() =>
                                  //   `${
                                  //     state.preferences.sports.includes(
                                  //       sport.id
                                  //     )
                                  //       ? "checked"
                                  //       : undefined
                                  //   }`}
                                  onChange={() => {
                                    handleInputChange(
                                      "UPDATE_SPORT_PREFERENCES",
                                      sport.id
                                    );
                                  }}
                                  type="checkbox"
                                />
                                <label
                                  className="mx-1"
                                  htmlFor={`${sport.id}-${sport.name}`}
                                >
                                  {sport.name}
                                </label>
                              </div>
                            );
                          })
                        )}
                      </div>

                      <br />
                      <p className="text-xl font-semibold mb-2">Teams</p>
                      <div className="flex flex-wrap gap-4 items-center">
                        {preferencesState.isLoading ? (
                          <div>Loading...</div>
                        ) : (
                          availableTeams?.map((team) => {
                            return (
                              <div key={team.id}>
                                <input
                                  id={`${team.id}-${team.name}`}
                                  name={team.name}
                                  checked={preferencesState.preferences.teams.includes(
                                    team.id
                                  )}
                                  onChange={() =>
                                    handleInputChange(
                                      "UPDATE_TEAM_PREFERENCES",
                                      team.id
                                    )
                                  }
                                  type="checkbox"
                                />
                                <label
                                  className="mx-1"
                                  htmlFor={`${team.id}-${team.name}`}
                                >
                                  {team.name}
                                </label>
                              </div>
                            );
                          })
                        )}
                      </div>
                      <div className="mt-4 text-left">
                        <button
                          type="submit"
                          className="inline-flex justify-center  border border-transparent bg-blue-600 px-2 py-1  text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          Update
                        </button>
                        <button
                          onClick={closeModal}
                          type="submit"
                          className="inline-flex justify-center  border border-transparent bg-gray-500 px-2 py-1 ml-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                    {/* </div> */}
                  </section>

                  {/* <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close!
                    </button>
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PreferencesForm;
