import { Fragment, useEffect, useState } from "react";
import PreferencesForm from "./PreferencesForm";
import { fetchSports } from "../../context/articles/action";
import { fetchTeams } from "../../context/preferences/action";
import { Sport, Team } from "../../context/types";
import { Dialog, Transition } from "@headlessui/react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const Preferences = () => {
  const [availableSports, setSports] = useState<Sport[]>();
  const [availableTeams, setTeams] = useState<Team[]>();

  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
    navigate("../");
  };

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
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Modal>
          {availableSports && availableTeams ? (
            <PreferencesForm
              closeModal={closeModal}
              availableSports={availableSports}
              availableTeams={availableTeams}
            />
          ) : undefined}
        </Modal>
      </Dialog>
    </Transition>
  );
};
export default Preferences;
