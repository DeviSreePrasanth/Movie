import React, { useState } from "react";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";
import axios from "axios";

const ProfileContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ProfileIcon = styled(FaUser)`
  font-size: 24px;
  cursor: pointer;
`;

const ProfileBox = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 200px;
  background: #fff; /* Fixed incomplete # value */
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 4px;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  z-index: 1000;
`;

const ProfileItem = styled.div`
  margin-bottom: 10px;
`;

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const userEmail = localStorage.getItem("userEmail") || "";

  const fetchUserDetails = async () => {
    if (!userEmail) {
      console.error("User email is not set");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:4000/api/user/${userEmail}`
      );
      setUserDetails(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const toggleProfileBox = async () => {
    if (!isOpen) {
      await fetchUserDetails();
    }
    setIsOpen(!isOpen);
  };

  return (
    <ProfileContainer>
      <ProfileIcon onClick={toggleProfileBox} />
      <ProfileBox $isOpen={isOpen}>
        {userDetails ? (
          <>
            <ProfileItem>
              <strong>Username:</strong> {userDetails.username}
            </ProfileItem>
            <ProfileItem>
              <strong>Email:</strong> {userDetails.email}
            </ProfileItem>
          </>
        ) : (
          <ProfileItem>Loading...</ProfileItem>
        )}
      </ProfileBox>
    </ProfileContainer>
  );
};

export default Profile;