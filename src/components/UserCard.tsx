import React from 'react';
import {IUser} from "../interfaces/IUser";
import Image from "next/image";

interface Props extends IUser {
  isThumbnailView: boolean;
  colorIndex: number;
}

const UserCard = ({
                    name,
                    picture,
                    location,
                    phone,
                    email,
                    isThumbnailView,
                    colorIndex
                  }: Props) => {

  // A function to get colors class
  const getColorClass = (index: number) => {
    const actualColorIndex = index % 5;
    switch (actualColorIndex) {
      case 1:
        return 'first-bg';
      case 2:
        return 'second-bg';
      case 3:
        return 'third-bg';
      case 4:
        return 'fourth-bg';
      case 5:
        return 'fifth-bg';
    }
  }

  return (
    <article
      className={`card ${isThumbnailView ? `card-thumbnail` : `card-list`}  ${isThumbnailView ? getColorClass(colorIndex) : ''}`}
    aria-label={'User Card'}
    >

      {/*   List View Graphic Element   */}
      {!isThumbnailView && (
        <>
          <figure aria-label={'Graphics Element'} className={`list-element-1 ${getColorClass(colorIndex)}`}/>
          <figure aria-label={'Graphics Element'} className={`list-element-2`}/>
        </>
      )}

      {/*     user Profile Image    */}
      <div aria-label={'User Profile Picture'} className={`user-profile ${isThumbnailView ? `user-profile-thumbnail` : `user-profile-list`}`}>
        <Image
          width={100}
          height={100}
          className={`user-profile-img`}
          src={picture.medium} alt={name.first}
          data-testid="userProfileImage"
        />
      </div>

      <section
        aria-label={'user name and city section'}
        className={`card__row-1 ${isThumbnailView ? `card__row-1-thumbnail` : `card__row-1-list`} ${isThumbnailView ? getColorClass(colorIndex) : ''}`}>
        <h2 aria-label={'User Name'} className={`user__name ${isThumbnailView ? `user__name-thumbnail` : `user__name-list`}`}>
          {name.first}
        </h2>

        <p aria-label={'user city'} className={`location ${isThumbnailView ? `hidden` : ``}`} data-testid="userCityFull">
          {location.city}
        </p>

        {/*     Layout Elements   */}
        <figure
          aria-label={'graphic element'}
          className={`first-box ${isThumbnailView ? `box` : ``}  ${isThumbnailView ? getColorClass(colorIndex) : ''}`}/>
        <figure className={`second-box ${isThumbnailView ? `box` : ``} `}/>

      </section>

      <section aria-label={'user section'} className={`card__row-2 ${isThumbnailView ? `card__row-2-thumbnail` : `card__row-2-list`}`}>
        <div
          aria-label={'user location and socials'}
          className={`card__row-2-content ${isThumbnailView ? `card__row-2-content-thumbnail` : `card__row-2-content-list`} `}
        >
          <p aria-label={'user city'} className={`location ${isThumbnailView ? `` : `hidden`}`} data-testid="userCityThumbnail">
            {location.city}
          </p>
          <div aria-label={'user socials'} className={`social-icons`}>
            <a aria-label={'Link to user email'} href={`mailto:${email}`} data-testid="mailToUserBtn">
              <Image aria-label={'email icon'} width={22} height={18} src={'/message.svg'} alt="Mail Icon"/>
            </a>
            <a aria-label={'Link to user phone number'} href={`tel:${phone}`} data-testid="userTelBtn">
              <Image aria-label={'phone icon'} width={19} height={19} src={'/phone.svg'} alt="Phone Icon"/>
            </a>
          </div>
        </div>
      </section>

    </article>
  );
};

export default UserCard;
