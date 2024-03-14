'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@nextui-org/react';
import { roleOptions } from '../../utils/data/lookupData';
import { createUser, updateUser } from '../../utils/data/userData';
import { useAuth } from '../../utils/context/authContext';
import { getLocations } from '../../utils/data/locationData';

const initialState = {
  name: '',
  email: '',
  role: '',
  uid: '',
  department: '',
  age: 0,
  gender: '',
  dob: '',
  researcher: {},
};

const UserForm = ({ existingUser = initialState, onSave }) => {
  const [userFormData, setUserFormData] = useState(initialState);
  const [filteredRoleOptions, setFilteredRoleOptions] = useState('Unassigned');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [locations, setLocations] = useState([]);
  const { user } = useAuth();
  const [locationId, setLocationId] = useState(new Set([]));

  useEffect(() => {
    getLocations().then(setLocations);

    if (existingUser.id) {
      if (existingUser.researcher) {
        setLocationId(new Set([`${existingUser.researcher.location_id}`]));
      }

      setUserFormData({
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        uid: existingUser.uid,
        department: existingUser.researcher?.department,
        age: existingUser.patient?.age,
        gender: existingUser.patient?.gender,
        dob: existingUser.patient?.dob,
      });
    }

    const options = roleOptions.filter((role) => {
      if (user.role === 'Admin') return true;
      if (user.role === 'Researcher' && (role.name === 'Admin' || role.name === 'Researcher')) return false;
      return true;
    });
    setFilteredRoleOptions(options);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (existingUser.id) {
      const dbUser = {
        id: existingUser.id,
        name: userFormData.name,
        email: userFormData.email,
        role: userFormData.role,
        uid: userFormData.uid,
        location_id: locationId && locationId.size > 0 ? [...locationId][0] : null,
        department: userFormData.department,
        age: userFormData.age,
        gender: userFormData.gender,
        dob: userFormData.dob,
      };
      updateUser(dbUser).then(() => {
        if (onSave) onSave();
      });
    }
    else {
      const dbUser = {
        name: userFormData.name,
        email: userFormData.email,
        role: userFormData.role,
        uid: userFormData.uid,
        location_id: locationId && locationId.size > 0 ? [...locationId][0] : null,
        department: userFormData.department,
        age: userFormData.age,
        gender: userFormData.gender,
        dob: userFormData.dob,
      };
      createUser(dbUser).then(() => {
        if (onSave) onSave();
      });
    }
  };

  return (
    <>
      {existingUser.id ? (
        <Button isIconOnly color="success" variant="faded" onPress={onOpen} endContent={<span className="material-symbols-outlined">edit</span>} />
      ) : (
        <Button color="primary" onPress={onOpen} endContent={<span className="material-symbols-outlined">add</span>}>
          Add User
        </Button>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{existingUser.id ? 'Update User' : 'Add User'}</ModalHeader>
              <ModalBody>
                <form id="user-form" onSubmit={handleSave} className="flex flex-col gap-4">
                {existingUser.id ? <div>{userFormData.uid}</div> : <></>}
                  <Input
                    label="UID"
                    name="uid"
                    className={existingUser.id ? 'hidden' : ''}
                    required
                    value={userFormData.uid}
                    onChange={handleChange} />
                  {existingUser.id ? <div>{userFormData.role}</div> : <></>}
                  <Select
                    label="Role"
                    className={existingUser.id ? 'hidden' : ''}
                    name="role"
                    required
                    selectedKeys={[userFormData.role]}
                    onChange={handleChange}
                  >
                    {filteredRoleOptions.map((role) => (
                      <SelectItem key={role.name} value={role.name}>{role.name}</SelectItem>
                    ))}
                  </Select>
                  <Input label="Name" name="name" required value={userFormData.name} onChange={handleChange} />
                  <Input label="Email" name="email" required value={userFormData.email} onChange={handleChange} />
                  
                  <Select
                    label="Location"
                    name="location_id"
                    required
                    className={userFormData.role === 'Researcher' ? '' : 'hidden'}
                    selectedKeys={locationId}
                    onSelectionChange={setLocationId}
                  >
                    {locations.map((location) => (
                      <SelectItem key={location.id} value={location.id}>{location.name}</SelectItem>
                    ))}
                  </Select>
                  <Input
                    label="Department"
                    className={userFormData.role === 'Researcher' ? '' : 'hidden'}
                    name="department"
                    required
                    value={userFormData.department}
                    onChange={handleChange}
                  />
                  <Input
                    label="Age"
                    className={userFormData.role === 'Patient' ? '' : 'hidden'}
                    name="age"
                    required
                    value={userFormData.age}
                    onChange={handleChange}
                  />
                  <Input
                    label="Gender"
                    className={userFormData.role === 'Patient' ? '' : 'hidden'}
                    name="gender"
                    required
                    value={userFormData.gender}
                    onChange={handleChange}
                  />
                  <Input
                    type="date"
                    label="DOB"
                    className={userFormData.role === 'Patient' ? '' : 'hidden'}
                    name="dob"
                    required
                    value={userFormData.dob}
                    onChange={handleChange}
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  form="user-form"
                  onPress={onClose}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>

  );
};

UserForm.propTypes = {
  existingUser: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    uid: PropTypes.string,
  })
};

export default UserForm;
